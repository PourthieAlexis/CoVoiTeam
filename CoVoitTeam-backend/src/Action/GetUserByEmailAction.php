<?php

namespace App\Action;

use App\Repository\UserRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
class GetUserByEmailAction
{
    #[Route('/api/user/{email}', name: 'get_user_by_email', methods: ['GET'])]
    public function getUserByEmail(
        UserRepository $userRepository,
        string $email,
        Request $request,
        SerializerInterface $serializer
    ): JsonResponse {
        $email = $request->get('email');
        $user = $userRepository->findOneBy(['email' => $email]);
        $serializedUser = $serializer->serialize($user, 'json', ['groups' => 'user:read']);
        return new JsonResponse($serializedUser, 200, [], true);
    }
}
