<?php

namespace App\Action;

use App\Entity\Car;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Repository\UserRepository;
use App\Repository\ModelRepository;
use App\Repository\BrandRepository;

#[AsController]
class CreateCarAction
{
    private $entityManager;
    private $userRepository;
    private $brandRepository;
    private $modelRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        BrandRepository $brandRepository,
        ModelRepository $modelRepository
    ) {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->brandRepository = $brandRepository;
        $this->modelRepository = $modelRepository;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $car = $this->createCarFromRequestData($data);

        $this->saveCar($car);

        return new JsonResponse(['message' => 'Votre voiture a bien été enregistrée']);
    }
    public function createCarFromRequestData(array $data): Car
    {
        $user = $this->userRepository->find($data['user_id']);
        $brand = $this->brandRepository->find($data['brand_id']);
        $model = $this->modelRepository->find($data['model_id']);
        $date = new \DateTime($data['year']);

        $car = new Car();
        $car->setColor($data['color']);
        $car->setYear($date);
        $car->setRegistration($data['registration']);
        $car->setUser($user);
        $car->setBrand($brand);
        $car->setModel($model);
        $car->setImages($data['images']);

        return $car;
    }
    public function saveCar(Car $car): void
    {
        $this->entityManager->persist($car);
        $this->entityManager->flush();
    }
}
