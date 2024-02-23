<?php

namespace App\Action;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsController]
class PasswordUpdateAction
{
    private $entityManager;
    private $validator;
    private $userRepository;
    private $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        ValidatorInterface $validator,
        UserPasswordHasherInterface $passwordHasher,
    ) {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->validator = $validator;
        $this->passwordHasher = $passwordHasher;
    }

    public function __invoke(Request $request): JsonResponse
    {
        /* Récupérer les données, puis l'utilisateur à partir de ces données */
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            return new JsonResponse(['error' => 'Invalid JSON data'], JsonResponse::HTTP_BAD_REQUEST);
        }
        $user = $this->UpdatePasswordFromRequestData($data);

        /* Vérifier si il y a des erreurs à la soumission */
        $errors = $this->validator->validate($user);
        if (count($errors) > 0) {
            return $this->handleValidationErrors($errors);
        }

        if ($user instanceof User) {
            // Mise à jour réussie, enregistrer l'utilisateur
            $this->saveUser($user);
            return new JsonResponse(['message' => 'Changement de mot de passe effectué avec succès']);
        } else {
            // Erreur, retourner le JsonResponse approprié
            return $user;
        }
    }

    private function UpdatePasswordFromRequestData(array $data): User | JsonResponse
    {
        $user = $this->userRepository->findOneBy(['token' => $data['token']]);
        if ($user) {
            /* Récuperer le token */
            $token = $user->getToken();
            /* Extraire le timestamp */
            $tokenTimestamp = substr($token, 32);
            /* Durée de validité du token en secondes */
            $expiration = 3600;
            /* Timestamp actuel */
            $currentTime = time();
            /* Temps écoulé entre la création du token et maintenant */
            $timeElapsed = $currentTime - $tokenTimestamp;
            /* Comparer si le temps écoulé est supérieur à la durée d'expiration */
            if($timeElapsed > $expiration) {
                return new JsonResponse(['error' => 'La durée de validité du lien a expiré. Veuillez faire une nouvelle demande.'], JsonResponse::HTTP_BAD_REQUEST);
            } else {
            $newPassword = $data['new_password'];
            $match = $this->passwordHasher->isPasswordValid($user, $newPassword);
            if(!$match) {
                /* Nouveau mot de passe hashé */
                $user->setPassword($this->passwordHasher->hashPassword($user, $data['new_password']));
                /* Remettre le champs token a null */
                $user->setToken(null);
                return $user;
            } else {
                return new JsonResponse(['error' => 'Votre nouveau mot de passe doit être différent de l\'ancien'], JsonResponse::HTTP_BAD_REQUEST);
            }
            }
        } else {
            return new JsonResponse(['error' => 'Invalid Token'], JsonResponse::HTTP_BAD_REQUEST);
        }
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