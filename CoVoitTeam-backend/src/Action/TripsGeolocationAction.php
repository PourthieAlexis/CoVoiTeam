<?php

namespace App\Action;

use App\Repository\StepsRepository;
use App\Repository\TripRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class TripsGeolocationAction extends AbstractController
{
    /**
     * @param Request $request
     * @param TripRepository $tripRepository
     * @param StepsRepository $stepsRepository
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function __invoke(Request $request, TripRepository $tripRepository, StepsRepository $stepsRepository, SerializerInterface $serializer): JsonResponse
    {
        $locationVisitor = json_decode($request->getContent(), true);
        $maxDistance = 10;
        //on récupère les trips
        $trips = $tripRepository->findBy(['isCanceled' => false], ['created_at' => 'DESC']);
        $response = [];
        $i = 0;
        $limit = 0;
        $addedIds = [];
        //une boucle tant que response est vide et que la limite n'a pas depassé 10 on continue l'execution du de la boucle sinon on renvoie les 5 derniers trajets
        while (empty($response) && $limit !== 10 || count($response) !== 3){

            foreach ($trips as $trip) {
                $stepDeparture = $stepsRepository->findOneBy(['trip' => $trip->getId(), 'type' => 'departure']);
                if (empty($stepDeparture)){
                    $departure = $trip->getUser()->getAddress();
                }else{
                    $departure = $stepDeparture;
                }
                $triplocation = [
                    'longitude' => $departure->getLongitude(),
                    'latitude' => $departure->getLatitude()
                ];
                $distance = $this->calculateDistance($triplocation, $locationVisitor);
                if ($distance <= $maxDistance && !in_array($trip->getId(), $addedIds)) {
                    $response[$i] = [
                        'date' => $trip->getDate(),
                        'trip' => $serializer->serialize($trip, 'json', ['groups' => ['trip:read', 'user:read', 'step:read']])
                    ];
                    $i++;
                    $addedIds[] = $trip->getId();
                }
                if (count($response) === 3){
                    break;
                }
            }
            $limit++;
            $maxDistance += 10;
        }

        if (empty($response)){
            $tripsJson = $tripRepository->findBy(['isCanceled' => false], ['created_at' => 'DESC'], 3);
                $response = $serializer->serialize($tripsJson, 'json', ['groups' => ['trip:read', 'user:read', 'step:read']]
                );
        }
        return new JsonResponse($response);

    }

    private function calculateDistance(array $tripLocation, array $locationVisitor): float|int
    {
        $earthRadius = 6371;

        $latTrip = deg2rad($tripLocation['latitude']);
        $lonTrip = deg2rad($tripLocation['longitude']);
        $latVisitor = deg2rad($locationVisitor['latitude']);
        $lonVisitor = deg2rad($locationVisitor['longitude']);

        $dLat = $latVisitor - $latTrip;
        $dLon = $lonVisitor - $lonTrip;

        $haversineDeltaA = sin($dLat / 2) * sin($dLat / 2) + cos($latTrip) * cos($latVisitor) * sin($dLon / 2) * sin($dLon / 2);
        $haversineC = 2 * atan2(sqrt($haversineDeltaA), sqrt(1 - $haversineDeltaA));
        return $earthRadius * $haversineC;
    }
}
