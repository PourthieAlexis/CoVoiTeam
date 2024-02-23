<?php

namespace App\Action;

use App\Entity\User;
use App\Service\EmailService;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[AsController]
class PasswordResetAction
{
    private $mail;
    private $entityManager;
    private $validator;
    private $userRepository;

    public function __construct(
        EmailService $mail,
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        ValidatorInterface $validator,
    ) {
        $this->mail = $mail;
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->validator = $validator;
    }

    public function __invoke(Request $request): JsonResponse
    {
        /* Récupérer les données, puis l'utilisateur à partir de ces données */
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            return new JsonResponse(['error' => 'Invalid JSON data'], JsonResponse::HTTP_BAD_REQUEST);
        }
        $user = $this->ResetPasswordFromRequestData($data);

        /* Vérifier si il y a des erreurs à la soumission */
        $errors = $this->validator->validate($user);
        if (count($errors) > 0) {
            return $this->handleValidationErrors($errors);
        }

        if ($user instanceof User) {
            // Mise à jour réussie, enregistrer l'utilisateur
            $this->saveUser($user);
            $this->sendResetPasswordEmail($user);
            return new JsonResponse(['message' => 'Si une adresse mail correspondate existe, un mail pour 
            changer votre mot de passe a été envoyé. Pensez à vérifier vos spams']);
        } else {
            // Erreur, retourner le JsonResponse approprié
            return $user;
        }
    }

    private function ResetPasswordFromRequestData(array $data): User | JsonResponse
    {
        $user = $this->userRepository->findOneBy(['email' => $data['email']]);
        if (!$user) {
            return new JsonResponse(['message' => 'Si une adresse mail correspondate existe, un mail pour 
            changer votre mot de passe a été envoyé. Pensez à vérifier vos spams']);
        }
    
        /* Génération du token */
        $randomToken = bin2hex(random_bytes(16));
        $timestamp = time();
        $token = $randomToken . $timestamp;
        $user->setToken($token);
    
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

    private function sendResetPasswordEmail(User $user): void
    {
        $token = ($user->getToken());
        $this->mail->sendWithTemplate(
            'alexispourthie@gmail.com',
            $user->getEmail(),
            'Réinitialisation du mot de passe',
            'emails/reset_password.html.twig',
            [
                'userEmail' => $user->getEmail(),
                'token' => $user->getToken(),
            ]
        );
    }
}