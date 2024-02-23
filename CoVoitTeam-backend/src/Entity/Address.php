<?php

namespace App\Entity;

use App\Repository\AddressRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Trait\AddressTrait;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource]
#[ORM\Entity(repositoryClass: AddressRepository::class)]
class Address
{
    use AddressTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;


    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['user:read'])]
    private ?string $additional_address = null;
  
    public function __construct($number, $additional_address, $street, $zipcode, $city, $country, $latitude = null, $longitude = null)
    {
        $this->number = $number;
        $this->additional_address = $additional_address;
        $this->street = $street;
        $this->zipcode = $zipcode;
        $this->city = $city;
        $this->country = $country;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
    }


    public function getId(): ?int
    {
        return $this->id;
    }


}