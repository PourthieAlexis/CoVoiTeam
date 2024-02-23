<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;

use App\Repository\CommentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Trait\CreatedAtTrait;
use App\Entity\Trait\UpdatedAtTrait;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Action\GetCommentByCommentedUserId;
use ApiPlatform\Metadata\ApiProperty;

#[ApiResource(
    operations: [
        new Get(),
        new Put(),
        new Delete(),
        new GetCollection(),
        new GetCollection(uriTemplate: '/comments/user/{commented_user_id}', controller: GetCommentByCommentedUserId::class,     
        uriVariables: [
            'commented_user_id' => new Link(fromClass: Comment::class),
        ],)
    ],
    normalizationContext: ['groups' => ['comment:read']],
    denormalizationContext: ['groups' => ['comment:write']],
)]
#[ORM\Entity(repositoryClass: CommentRepository::class)]
class Comment
{
    use CreatedAtTrait;
    use UpdatedAtTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['comment:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['comment:read'])]
    private ?int $rating = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['comment:read'])]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'comment')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['comment:read'])]
    private ?User $user = null;

    #[ORM\Column(length: 20)]
    private ?string $object = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['comment:read'])]
    private ?int $commented_user_id = null;

    #[ORM\Column]
    #[Groups(['comment:read'])]
    private ?bool $isVisible = null;

    public function __construct()
    {
        $this->created_at = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(int $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getObject(): ?string
    {
        return $this->object;
    }

    public function setObject(string $object): static
    {
        $this->object = $object;

        return $this;
    }

    public function getCommentedUserId(): ?int
    {
        return $this->commented_user_id;
    }

    public function setCommentedUserId(?int $commented_user_id): static
    {
        $this->commented_user_id = $commented_user_id;

        return $this;
    }

    public function isIsVisible(): ?bool
    {
        return $this->isVisible;
    }

    public function setIsVisible(bool $isVisible): static
    {
        $this->isVisible = $isVisible;

        return $this;
    }
}
