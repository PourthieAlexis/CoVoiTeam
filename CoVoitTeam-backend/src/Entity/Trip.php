<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Action\TripsGeolocationAction;
use App\Entity\Trait\CreatedAtTrait;
use App\Entity\Trait\UpdatedAtTrait;
use App\Repository\TripRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Context;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

#[ApiResource(
    normalizationContext: ['groups' => ['trip:read']],
)]
#[GetCollection(order: ['dateTrip' => 'DESC'])]
#[Get]
#[Post]
#[Post(
    uriTemplate: '/trips/geolocation', controller: TripsGeolocationAction::class, name: 'app_trips_geolocation'
)]
#[ORM\Entity(repositoryClass: TripRepository::class)]
class Trip
{
    use CreatedAtTrait;
    use UpdatedAtTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['trip:read', 'user:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'd/m/Y'])]
    private ?\DateTimeInterface $dateTrip = null;

    #[ORM\Column]
    #[Groups(['trip:read', 'user:read'])]
    private ?int $numberSeats = null;

    #[ORM\Column]
    #[Groups(['trip:read', 'user:read'])]
    private ?int $smallLuggage = null;

    #[ORM\Column]
    #[Groups(['trip:read', 'user:read'])]
    private ?int $bigLuggage = null;

    #[ORM\Column]
    #[Groups(['trip:read', 'user:read'])]
    private ?int $price = null;

    #[ORM\ManyToOne(inversedBy: 'trip')]
    #[Groups(['trip:read'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'trip', targetEntity: Booking::class)]
    #[Groups(['trip:read'])]
    private Collection $bookings;

    #[ORM\OneToMany(mappedBy: 'trip', targetEntity: Step::class)]
    #[Groups(['trip:read', 'user:read'])]
    private Collection $steps;

    #[ORM\Column]
    #[Groups(['trip:read', 'user:read'])]
    private ?bool $isComplete = false;

    #[ORM\Column]
    #[Groups(['trip:read', 'user:read'])]
    private ?bool $isEnded = false;

    #[ORM\Column]
    #[Groups(['trip:read', 'user:read'])]
    private ?bool $isCanceled = false;

    public function __construct()
    {
        $this->created_at = new \DateTimeImmutable();
        $this->bookings = new ArrayCollection();
        $this->steps = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(['trip:read', 'user:read'])]
    public function getDate(): ?\DateTimeInterface
    {
        return $this->dateTrip;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->dateTrip = $date;

        return $this;
    }

    public function getNumberSeats(): ?int
    {
        return $this->numberSeats;
    }

    public function setNumberSeats(int $numberSeats): static
    {
        $this->numberSeats = $numberSeats;

        return $this;
    }

    public function getSmallLuggage(): ?int
    {
        return $this->smallLuggage;
    }

    public function setSmallLuggage(int $smallLuggage): static
    {
        $this->smallLuggage = $smallLuggage;

        return $this;
    }

    public function getBigLuggage(): ?int
    {
        return $this->bigLuggage;
    }

    public function setBigLuggage(int $bigLuggage): static
    {
        $this->bigLuggage = $bigLuggage;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

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

    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setTrip($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getTrip() === $this) {
                $booking->setTrip(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Step>
     */
    public function getSteps(): Collection
    {
        return $this->steps;
    }

    public function addStep(Step $step): static
    {
        if (!$this->steps->contains($step)) {
            $this->steps->add($step);
            $step->setTrip($this);
        }

        return $this;
    }

    public function removeStep(Step $step): static
    {
        if ($this->steps->removeElement($step)) {
            // set the owning side to null (unless already changed)
            if ($step->getTrip() === $this) {
                $step->setTrip(null);
            }
        }

        return $this;
    }

    public function isIsComplete(): ?bool
    {
        return $this->isComplete;
    }

    public function setIsComplete(bool $isComplete): static
    {
        $this->isComplete = $isComplete;

        return $this;
    }

    public function isIsEnded(): ?bool
    {
        return $this->isEnded;
    }

    public function setIsEnded(bool $isEnded): static
    {
        $this->isEnded = $isEnded;

        return $this;
    }

    public function isIsCanceled(): ?bool
    {
        return $this->isCanceled;
    }

    public function setIsCanceled(bool $isCanceled): static
    {
        $this->isCanceled = $isCanceled;

        return $this;
    }
}
