<?php

namespace App\Action;

use App\Repository\CarsRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GetCarByRegistrationAction
{
    #[Route('/api/car/{registration}', name: 'get_car_by_registration', methods: ['GET'])]
    public function getCarByRegistration(
        CarsRepository $carsRepository,
        string $registration,
        Request $request
    ) {
        $registration = $request->get('registration');
        $car = $carsRepository->findOneBy(['registration' => $registration]);
        ($car) ? $result = true : $result = false;
        return new JsonResponse($result, 200);
    }
}
