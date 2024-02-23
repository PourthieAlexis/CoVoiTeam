<?php

namespace App\Entity;

use App\Repository\StepsRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Trait\AddressTrait;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: (['groups' => ['step:read']])
)]
#[ORM\Entity(repositoryClass: StepsRepository::class)]
class Step
{
    use AddressTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['step:read', 'user:read', 'trip:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['step:read', 'user:read', 'trip:read'])]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'steps')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Trip $trip = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getTrip(): ?Trip
    {
        return $this->trip;
    }

    public function setTrip(?Trip $trip): static
    {
        $this->trip = $trip;

        return $this;
    }
}
