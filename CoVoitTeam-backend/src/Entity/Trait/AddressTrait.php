<?php

namespace App\Entity\Trait;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait AddressTrait
{
    #[ORM\Column(length: 10)]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?int $number = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $additional_address = null;

    #[ORM\Column(length: 50)]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $street = null;

    #[ORM\Column(length: 5)]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $zipcode = null;

    #[ORM\Column(length: 50)]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $city = null;

    #[ORM\Column(length: 50)]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $country = null;

    #[ORM\Column(length: 20)]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $latitude = null;

    #[ORM\Column(length: 20)]
    #[Groups(['user:read', 'user:write', 'trip:read'])]
    private ?string $longitude = null;

    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(int $number): static
    {
        $this->number = $number;

        return $this;
    }

    public function getAdditionalAddress(): ?string
    {
        return $this->additional_address;
    }

    public function setAdditionalAddress(string $additional_address): static
    {
        $this->additional_address = $additional_address;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): static
    {
        $this->street = $street;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): static
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(string $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(string $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }
}