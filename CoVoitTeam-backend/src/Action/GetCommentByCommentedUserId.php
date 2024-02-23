<?php

namespace App\Action;

use App\Repository\CommentRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
class GetCommentByCommentedUserId
{
    public function __invoke(
        string $commented_user_id,
        CommentRepository $commentRepository,
        SerializerInterface $serializer
    ): JsonResponse {
        $comment = $commentRepository->findBy(['commented_user_id' => $commented_user_id]);
        $serializedUser = $serializer->serialize($comment, 'json', ['groups' => 'comment:read']);
        return new JsonResponse($serializedUser, 200, [], true);
    }
}   
