<?php

namespace App\Action;

use App\Entity\Address;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\EmailService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class RegisterUserAction
{
    private $passwordHasher;
    private $JWTManager;
    private $mail;
    private $entityManager;
    private $validator;
    private $userRepository;

    public function __construct(
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $JWTManager,
        EmailService $mail,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        UserRepository $userRepository
    ) {
        $this->passwordHasher = $passwordHasher;
        $this->JWTManager = $JWTManager;
        $this->mail = $mail;
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->userRepository = $userRepository;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->createUserFromRequestData($data);

        $errors = $this->validator->validate($user);
        if (count($errors) > 0) {
            return $this->handleValidationErrors($errors);
        }

        $this->saveUser($user);
        $this->sendVerificationEmail($user);

        return new JsonResponse(['message' => 'Un mail vous a été envoyé pour valider votre adresse mail']);
    }

    private function createUserFromRequestData(array $data): User
    {
        $randomString = bin2hex(random_bytes(16));
        $timestamp = time();
        $token = $randomString . $timestamp;

        $dateBirthday = new \DateTime($data['birthday']);
        $user = new User();
        $user->setEmail($data['email'])
            ->setFirstname($data['firstname'])
            ->setLastname($data['lastname'])
            ->setBirthday($dateBirthday)
            ->setPhone($data['phone'])
            ->setCredit(0)
            ->setPassword($this->passwordHasher->hashPassword($user, $data['password']))
            ->setToken($token);

        $isAddress = !empty($data['street']) && !empty($data['zipcode']) && !empty($data['city']);

        if ($isAddress) {
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
        }
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

    private function sendVerificationEmail(User $user): void
    {
        $token = $user->getToken();
        $this->mail->sendWithTemplate(
            'alexispourthie@gmail.com',
            $user->getEmail(),
            'Veuillez vérifier votre adresse e-mail',
            'emails/signup.html.twig',
            [
                'name' => $user->getLastname(),
                'userEmail' => $user->getEmail(),
                'token' => $user->getToken(),
            ]
        );
    }

    public function verifyEmail(string $token): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['token' => $token]);
        if ($user) {
            $user->setIsVerified(true);
            $user->setToken(null);
            $this->entityManager->persist($user);
            $this->entityManager->flush();
            return new JsonResponse(['message' => 'Votre adresse e-mail a été vérifiée avec succès.']);
        }

        return new JsonResponse(['message' => 'Impossible de vérifier votre adresse e-mail.'], JsonResponse::HTTP_NOT_FOUND);
    }
}