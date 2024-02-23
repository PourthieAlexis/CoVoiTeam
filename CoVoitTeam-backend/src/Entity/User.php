<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;


use App\Action\GetUserByEmailAction;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Action\RegisterUserAction;
use App\Repository\UserRepository;
use App\Action\PasswordResetAction;
use App\Action\PasswordUpdateAction;
use App\Entity\Trait\CreatedAtTrait;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Action\RegisterAddressAction;
use Doctrine\Common\Collections\Collection;
use App\Validator\Constraints as CustomAssert;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ApiResource(
    operations: [
        new Get(),
        new Put(),
        new Delete(),
        new GetCollection(),
        new Post(controller: RegisterUserAction::class),
        new Post(uriTemplate: '/password-reset', controller: PasswordResetAction::class, name: 'password_reset'),
        new Post(uriTemplate: '/password-update', controller: PasswordUpdateAction::class, name: 'password_update'),
        new Post(uriTemplate: '/add-address', controller: RegisterAddressAction::class, name: 'add-address'),
        new Get(
            uriTemplate: '/user/{email}',
            uriVariables: [
                'email' => new Link(fromProperty: 'email', fromClass: User::class)
            ],
            controller: GetUserByEmailAction::class,
            name: 'get_user_by_email'
        ),
        new Patch(),

    ],

    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']],
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: 'email', message: "L'email est déjà utilisé")]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use CreatedAtTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'trip:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank(
        message: 'L\email ne peut pas être vide',
    )]
    #[Assert\Email(
        message: 'Votre email n\'est pas valide.',
    )]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = ['ROLE_USER'];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Assert\NotBlank(
        message: 'Le mot de passe ne peut pas être vide',
    )]
    #[Assert\PasswordStrength([
        'message' => 'Votre mot de passe est trop petit'
    ])]
    #[Groups(['user:read', 'user:write'])]
    private ?string $password = null;

    #[ORM\Column(length: 50)]
    #[Assert\NotBlank(
        message: 'Votre prénom ne peut pas être vide',
    )]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 50)]
    #[Assert\NotBlank(
        message: 'Votre nom ne peut pas être vide',
    )]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $lastname = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Assert\NotBlank(
        message: 'Votre date de naissance ne peut pas être vide',
    )]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    #[Assert\Type(
        type: 'DateTimeInterface',
        message: "La date n'a pas le bon format"
    )]
    #[CustomAssert\AgeRange([
        'minAge' => '18',
        'maxAge' => '100',
        'minMessage' => "Vous devez avoir au moins {{ limit }} ans pour vous inscrire.",
        'maxMessage' => "Vous ne pouvez pas vous inscrire si vous avez plus de {{ limit }} ans."
    ])]
    private ?\DateTimeInterface $birthday = null;

    #[ORM\Column(length: 15)]
    #[Assert\NotBlank(
        message: 'Votre numéro de téléphone ne peut pas être vide',
    )]
    #[Assert\Regex(
        pattern: '/^(0|\+33|0033)[1-9]([-. ]?[0-9]{2}){4}$/',
        message: "Votre numéro de téléphone n'a pas le bon format"
    )]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $phone = null;

    #[ORM\Column]
    #[Assert\GreaterThanOrEqual(
        value: 0,
    )]
    #[Groups(['user:read'])]
    private ?int $credit = null;

    #[ORM\Column]
    #[Groups(['user:read', 'trip:read'])]
    private ?bool $isVerified = false;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $token = null;

    #[Groups(['user:read', 'user:write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $profilePicture = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['user:read', 'user:write'])]
    private ?Address $address = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Car::class)]
    private Collection $cars;

    #[ORM\ManyToMany(targetEntity: Preference::class, inversedBy: 'users')]
    #[Groups(['user:trip:geolocation'])]
    private Collection $preferences;

    #[Groups(['user:read'])]
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Trip::class)]
    private Collection $trip;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Comment::class)]
    private Collection $comment;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Report::class)]
    private Collection $report;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Notification::class)]
    private Collection $notifications;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Message::class)]
    private Collection $messages;

    #[ORM\OneToMany(mappedBy: 'userReceiving', targetEntity: Message::class)]
    private Collection $messagesReceiving;

    #[ORM\OneToMany(mappedBy: 'userNotified', targetEntity: Report::class)]
    private Collection $reportsNotified;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Order::class)]
    private Collection $orders;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Booking::class)]
    private Collection $bookings;

    #[ORM\Column]
    private ?bool $isActive = true;

    public function __construct()
    {
        $this->cars = new ArrayCollection();
        $this->preferences = new ArrayCollection();
        $this->trip = new ArrayCollection();
        $this->comment = new ArrayCollection();
        $this->report = new ArrayCollection();
        $this->notifications = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->messagesReceiving = new ArrayCollection();
        $this->reportsNotified = new ArrayCollection();
        $this->orders = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->created_at = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(\DateTimeInterface $birthday): static
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getCredit(): ?int
    {
        return $this->credit;
    }

    public function setCredit(int $credit): static
    {
        $this->credit = $credit;

        return $this;
    }

    public function isIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): static
    {
        $this->token = $token;

        return $this;
    }

    public function getProfilePicture(): ?string
    {
        return $this->profilePicture;
    }

    public function setProfilePicture(string $profilePicture): static
    {
        $this->profilePicture = $profilePicture;

        return $this;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(Address $address): static
    {
        $this->address = $address;

        return $this;
    }


    public function getCars(): Collection
    {
        return $this->cars;
    }

    public function addCar(Car $car): static
    {
        if (!$this->cars->contains($car)) {
            $this->cars->add($car);
            $car->setUser($this);
        }

        return $this;
    }

    public function removeCar(Car $car): static
    {
        if ($this->cars->removeElement($car)) {
            // set the owning side to null (unless already changed)
            if ($car->getUser() === $this) {
                $car->setUser(null);
            }
        }

        return $this;
    }


    public function getPreferences(): Collection
    {
        return $this->preferences;
    }

    public function addPreference(Preference $preference): static
    {
        if (!$this->preferences->contains($preference)) {
            $this->preferences->add($preference);
        }

        return $this;
    }

    public function removePreference(Preference $preference): static
    {
        $this->preferences->removeElement($preference);

        return $this;
    }

    public function getTrip(): Collection
    {
        return $this->trip;
    }

    public function addTrip(Trip $trip): static
    {
        if (!$this->trip->contains($trip)) {
            $this->trip->add($trip);
            $trip->setUser($this);
        }

        return $this;
    }

    public function removeTrip(Trip $trip): static
    {
        if ($this->trip->removeElement($trip)) {
            // set the owning side to null (unless already changed)
            if ($trip->getUser() === $this) {
                $trip->setUser(null);
            }
        }

        return $this;
    }


    public function getComment(): Collection
    {
        return $this->comment;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comment->contains($comment)) {
            $this->comment->add($comment);
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comment->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    public function getReport(): Collection
    {
        return $this->report;
    }

    public function addReport(Report $report): static
    {
        if (!$this->report->contains($report)) {
            $this->report->add($report);
            $report->setUser($this);
        }

        return $this;
    }

    public function removeReport(Report $report): static
    {
        if ($this->report->removeElement($report)) {
            // set the owning side to null (unless already changed)
            if ($report->getUser() === $this) {
                $report->setUser(null);
            }
        }

        return $this;
    }

    public function getNotifications(): Collection
    {
        return $this->notifications;
    }

    public function addNotification(Notification $notification): static
    {
        if (!$this->notifications->contains($notification)) {
            $this->notifications->add($notification);
            $notification->setUser($this);
        }

        return $this;
    }

    public function removeNotification(Notification $notification): static
    {
        if ($this->notifications->removeElement($notification)) {
            // set the owning side to null (unless already changed)
            if ($notification->getUser() === $this) {
                $notification->setUser(null);
            }
        }

        return $this;
    }

    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setUser($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getUser() === $this) {
                $message->setUser(null);
            }
        }

        return $this;
    }

    public function getMessagesReceiving(): Collection
    {
        return $this->messagesReceiving;
    }

    public function addMessageReceiving(Message $message): static
    {
        if (!$this->messagesReceiving->contains($message)) {
            $this->messagesReceiving->add($message);
            $message->setUser($this);
        }

        return $this;
    }

    public function removeMessageReceiving(Message $message): static
    {
        if ($this->messagesReceiving->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getUser() === $this) {
                $message->setUser(null);
            }
        }

        return $this;
    }
    public function getReportsNotified(): Collection
    {
        return $this->reportsNotified;
    }

    public function addReportsNotified(Report $reportsNotified): static
    {
        if (!$this->reportsNotified->contains($reportsNotified)) {
            $this->reportsNotified->add($reportsNotified);
            $reportsNotified->setUserNotified($this);
        }

        return $this;
    }

    public function removeReportsNotified(Report $reportsNotified): static
    {
        if ($this->reportsNotified->removeElement($reportsNotified)) {
            // set the owning side to null (unless already changed)
            if ($reportsNotified->getUserNotified() === $this) {
                $reportsNotified->setUserNotified(null);
            }
        }

        return $this;
    }

    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setUser($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getUser() === $this) {
                $order->setUser(null);
            }
        }

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
            $booking->setUser($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getUser() === $this) {
                $booking->setUser(null);
            }
        }

        return $this;
    }

    public function isIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }
}
