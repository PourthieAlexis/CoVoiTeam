<?php

namespace App\Action;

use App\Repository\CarsRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class GetCarsByUserAction extends AbstractController
{
    public function __construct(
        private CarsRepository $carsRepository,
        private UserRepository $userRepository
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $userId = $request->get('id');
        $user = $this->userRepository->findOneBy(['id' => $userId]);
        $cars = $this->carsRepository->findAllByUser($user);
        if(!$cars) {
            return new JsonResponse("Vous n'avez pas de véhicule enregistré.", 200);
        }
        $result = [];
        foreach ($cars as $car) {
            $result[] = [
                'id' => $car->getId(),
                'color' => $car->getColor(),
                'year' => $car->getYear(),
                'registration' => $car->getRegistration(),
                'brand' => $car->getBrand()->getName(),
                'model' => $car->getModel()->getName(),
                'images' => $car->getImages(),
            ];
        }
        
        return new JsonResponse($result, 200);
    }
}
