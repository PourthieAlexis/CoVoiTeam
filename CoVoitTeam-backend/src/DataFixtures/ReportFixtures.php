<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Report;
use Faker\Factory;
use App\Entity\User;
use App\Entity\Message;
use App\Entity\Comment;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class ReportFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        $messages = $manager->getRepository(Message::class)->findAll();
        $comments = $manager->getRepository(Comment::class)->findAll();
        $faker = Factory::create('fr_FR');
        $entities = ['User', 'Message', 'Comment'];

        for ($i = 0; $i < 10; $i++) {
            $report = new Report();
            $report->setReason($faker->text(200));
            $report->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-30 days', 'now')));
            $report->setIsProcessed(false);
            $report->setUser($users[array_rand($users)]);
            $report->setEntityName($entities[array_rand($entities)]);
            switch ($report->getEntityName()) {
                case 'User':
                    $user = $users[array_rand($users)];
                    $report->setEntityId($user->getId());
                    $userNotified = $user;
                case 'Message':
                    $report->setEntityId($messages[array_rand($messages)]->getId());
                    $message = $manager->getRepository(Message::class)->find($report->getEntityId());
                    $userNotified = $message->getUser();
                case 'Comment':
                    $report->setEntityId($comments[array_rand($comments)]->getId());
                    $comment = $manager->getRepository(Comment::class)->find($report->getEntityId());
                    $userNotified = $comment->getUser();
                case 'default':
                    $report->setUserNotified($userNotified);
                    break;
            }
            $manager->persist($report);
        }

        $manager->flush();
    }
    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            MessageFixtures::class,
            CommentFixtures::class,
        ];
    }
}
