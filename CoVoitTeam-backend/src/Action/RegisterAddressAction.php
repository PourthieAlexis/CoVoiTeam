<?php

namespace App\Action;

use App\Entity\User;
use App\Entity\Address;
use App\Repository\AddressRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[AsController]
class RegisterAddressAction
{
    private $entityManager;
    private $validator;
    private $userRepository;
    private $addressRepository;

    public function __construct(
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        UserRepository $userRepository,
        AddressRepository $addressRepository,
    ) {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->userRepository = $userRepository;
        $this->addressRepository = $addressRepository;
    }

    public function __invoke(Request $request): JsonResponse
    {
        /* Récupérer les données */
        $data = json_decode($request->getContent(), true);

        /* Récupérer l'utilisateur à parti de ces données */
        $user = $this->createAddressFromRequestData($data);

        /* Vérifier les erreurs */
        $errors = $this->validator->validate($user);
        if (count($errors) > 0) {
            return $this->handleValidationErrors($errors);
        }

        if ($user instanceof User) {
            // Mise à jour réussie, enregistrer l'utilisateur
            $this->saveUser($user);
            return new JsonResponse(['message' => 'Adresse ajoutée']);
        } else {
            // Erreur, retourner le JsonResponse approprié
            return $user;
        }
    }

    private function createAddressFromRequestData(array $data) : User | JsonResponse
    {
        $user = $this->userRepository->findOneBy(['email' => $data['email']]);

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur inconnu'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $user->setAddress(
            new Address(
                $data['number'],
                $data['additional_address'],
                $data['street'],
                $data['zipcode'],
                $data['city'],
                $data['country'],
                $data['latitude'],
                $data['longitude'],
            )
        );
        return $user;
    }

    private function handleValidationErrors($errors): JsonResponse
    {
        $errorMessages = [];
        foreach ($errors as $error) {
            $errorMessages[] = $error->getMessage();
        }
        return new JsonResponse(['errors' => $errorMessages], JsonResponse::HTTP_BAD_REQUEST);
    }

    private function saveUser(User $user): void
    {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}