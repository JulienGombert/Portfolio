<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function ShowIndex(){
        return $this->render('home.html.twig');
    }

    /**
     * @Route("/cv", name="cv")
     */
    public function ShowCv(){
        return $this->render('cv.html.twig');
    }
}