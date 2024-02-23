<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use App\Entity\User;
use App\Entity\Address;
use App\Entity\Preference;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class UserFixtures extends Fixture implements DependentFixtureInterface
{
    public function __construct(
        private UserPasswordHasherInterface $passwordEncoder,
        private SluggerInterface $slugger
    ) {
    }
    public function load(ObjectManager $manager): void
    {
        // Création d'un utilisateur de type "admin"
        $admin = new User();
        $address = $this->createAddress($manager);
        $admin->setEmail('admin@demo.fr');
        $admin->setLastname('Tsuno');
        $admin->setFirstname('Yoko');
        $admin->setBirthday(new \DateTime('1980-01-01'));
        $admin->setPhone('606060606');
        $admin->setAddress($address);
        $admin->setCredit(0);
        $admin->setIsVerified(true);
        $admin->setIsActive(true);
        $admin->setProfilePicture('yoko.jpg');
        $admin->setPassword(
            $this->passwordEncoder->hashPassword($admin, 'admin')
        );
        $admin->setRoles(['ROLE_ADMIN']);

        $manager->persist($admin);

        // Création d'un utilisateur de type "user"
        $faker = \Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 50; $i++) {
            $user = new User();
            $address = $this->createAddress($manager);
            $user->setEmail($faker->email());
            $user->setLastname($faker->lastName());
            $user->setFirstname($faker->firstName());
            $user->setBirthday($faker->dateTimeBetween('-90 years', '-18 years'));
            $phoneNumber = $faker->serviceNumber();
            // j'enlève les espaces
            $phoneNumber = str_replace(' ', '', $phoneNumber);
            // j'enlève le zéro du début ou (0) ou le +33 ou le +33(0)
            $phoneNumber = $phoneNumber[0] == '0' ? substr($phoneNumber, 1) : $phoneNumber;
            $phoneNumber = substr($phoneNumber, 0, 3) == '+33' ? substr($phoneNumber, 3) : $phoneNumber;
            $phoneNumber = substr($phoneNumber, 0, 3) == '(0)' ? substr($phoneNumber, 3) : $phoneNumber;

            $user->setPhone($phoneNumber);
            $user->setAddress($address);
            $user->setCredit(50);
            $user->setIsVerified(true);
            $user->setIsActive(true);
            $user->setProfilePicture($faker->image(null, 150, 150));

            // Ajout des préférences
            $preferences = $manager->getRepository(Preference::class)->findAll();
            $user->addPreference($preferences[array_rand($preferences)]);

            $user->setPassword(
                $this->passwordEncoder->hashPassword($user, 'user')
            );
            $user->setRoles(['ROLE_USER']);

            $manager->persist($user);
        }

        $manager->flush();
    }
    public function createAddress(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('fr_FR');

        $number = $faker->buildingNumber();
        $street = $faker->streetName();
        $zipcode = str_replace(' ', '', $faker->postcode());
        $city = $faker->city();
        $country = 'France';
        $latitude = $faker->latitude();
        $longitude = $faker->longitude();
        $address = new Address($number, null, $street, $zipcode,$city, $country, $latitude, $longitude);
        $manager->persist($address);
        $manager->flush();
        return $address;
    }
    public function getDependencies(): array
    {
        return [
            PreferenceFixtures::class,
        ];
    }
}
