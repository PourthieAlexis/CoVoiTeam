<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Comment;
use App\Entity\User;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker\Factory;

class CommentFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        // Création d'un utilisateur de type "user"
        $faker = Factory::create('fr_FR');

        $rates = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

        for ($i = 0; $i < 10; $i++) {
            $comment = new Comment();

            $comment->setRating($rates[array_rand($rates)]);
            $comment->setContent($faker->text(200));
            $comment->setIsVisible(true);
            $user = $users[array_rand($users)];
            $comment->setUser($user);
            $comment->setObject('user');
            $commentedUser = $users[array_rand($users)];
            $comment->setCommentedUserId($commentedUser->getId());

            $manager->persist($comment);
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
