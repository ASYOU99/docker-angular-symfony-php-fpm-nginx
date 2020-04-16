<?php

namespace App\Security;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @Route("/api/login_check")
     * @param Request $request
     * @param JWTTokenManagerInterface $JWTManager
     * @param UserPasswordEncoderInterface $encoder
     * @return JsonResponse
     */
    public function getTokenUser(Request $request, JWTTokenManagerInterface $JWTManager, UserPasswordEncoderInterface $encoder) {

        $username = $request->get('email');

        $password = $request->get('password');

        if (empty($username) || empty($password)) {

            return $this->respondValidationError("Invalid username or password");
        }
        $em = $this->getDoctrine()->getManager();
        /* @var $user User */
        $user = $em->getRepository(User::class)->findOneBy([
            'email' =>$username,
        ]);
        if (!$user) {
            //returns 422
            return $this->respondValidationError("User with these credentials not found");
        }
        if ($user->getPassword() !== $encoder->encodePassword($user, $password)) {
            //returns 422
            return $this->respondValidationError("User with these credentials not found");
        }
        return new JsonResponse(['test' => $JWTManager->create($user)]);
    }

}
