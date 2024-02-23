<?php

namespace App\Entity;

use App\Repository\CarsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Link;
use App\Action\CreateCarAction;
use App\Action\GetCarsByUserAction;
use App\Action\GetCarByRegistrationAction;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(),
        new Get(
            name: 'get_car_by_registration',
            uriTemplate: '/car/{registration}',
            uriVariables: ['registration' => 'registration'],
            controller: GetCarByRegistrationAction::class
        ),
        new GetCollection(),
        new GetCollection(
            name: 'get_cars_by_user',
            uriTemplate: 'cars/user/{id}',
            uriVariables: ['id' => new Link(fromProperty: 'cars', fromClass: User::class)],
            controller: GetCarsByUserAction::class
        ),
        new Post(controller: CreateCarAction::class),
        new Put(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['car:read']],
)]
#[ORM\Entity(repositoryClass: CarsRepository::class)]
class Car
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['car:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 6)]
    #[Groups(['car:read'])]
    private ?string $color = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['car:read'])]
    private ?\DateTimeInterface $year = null;

    #[ORM\Column(length: 10)]
    #[Groups(['car:read'])]
    private ?string $registration = null;

    #[ORM\ManyToMany(targetEntity: Accessibility::class, inversedBy: 'cars')]
    #[Groups(['car:read'])]
    private Collection $accesibility;

    #[ORM\ManyToOne(inversedBy: 'cars')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['car:read'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'cars')]
    #[Groups(['car:read'])]
    private ?Brand $brand = null;

    #[ORM\ManyToOne(inversedBy: 'cars')]
    #[Groups(['car:read'])]
    private ?Model $model = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['car:read'])]
    private ?array $images = null;

    public function __construct()
    {
        $this->accesibility = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getYear(): ?\DateTimeInterface
    {
        return $this->year;
    }

    public function setYear(\DateTimeInterface $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getRegistration(): ?string
    {
        return $this->registration;
    }

    public function setRegistration(string $registration): static
    {
        $this->registration = $registration;

        return $this;
    }

    /**
     * @return Collection<int, Accessibility>
     */
    public function getAccesibility(): Collection
    {
        return $this->accesibility;
    }

    public function addAccesibility(Accessibility $accesibility): static
    {
        if (!$this->accesibility->contains($accesibility)) {
            $this->accesibility->add($accesibility);
        }

        return $this;
    }

    public function removeAccesibility(Accessibility $accesibility): static
    {
        $this->accesibility->removeElement($accesibility);

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

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): static
    {
        $this->brand = $brand;

        return $this;
    }

    public function getModel(): ?Model
    {
        return $this->model;
    }

    public function setModel(?Model $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function getImages(): ?array
    {
        return $this->images;
    }

    public function setImages(?array $images): static
    {
        $this->images = $images;

        return $this;
    }
}
