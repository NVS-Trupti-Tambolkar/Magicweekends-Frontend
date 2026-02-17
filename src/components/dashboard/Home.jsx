import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header/Header';
import UpcomingTrips from './UpcomingTrips';
import ExploreWithUs from './ExploreWithUs';
import Footer from '../footer/Footer';
import Gallery from './Gallery';
import WeekendTrips from './WeekendTrips';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [currentWord, setCurrentWord] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Words to type after "Experience"
  const words = ["Peace", "Nature", "Thrill", "Adventure", "Freedom", "Joy"];

  // Typing effect for words
  useEffect(() => {
    const currentWordFull = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (currentCharIndex < currentWordFull.length) {
          setCurrentWord(prev => prev + currentWordFull.charAt(currentCharIndex));
          setCurrentCharIndex(prev => prev + 1);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentCharIndex > 0) {
          setCurrentWord(prev => prev.slice(0, -1));
          setCurrentCharIndex(prev => prev - 1);
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentCharIndex, isDeleting, currentWordIndex, words]);

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle hash-based scrolling when navigating from another page
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.hash]);



  return (
    <div className="relative min-h-screen">
      {/* Header with conditional styling based on scroll */}
      <Header scrolled={scrolled} />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://res.cloudinary.com/ddlbqi64f/video/upload/video1_yhmyj6.mp4"
              type="video/mp4"
            />
            Your browser does not support video tag.
          </video>

          {/* Overlay to make text more readable */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Hero Content - Updated to bottom-left positioning */}
        <div className="relative z-10 flex items-end justify-start h-full text-white px-6 md:px-12">
          <div className="flex flex-col items-start justify-end mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-left mb-7">Experience</h1>
            <span className="text-5xl md:text-4xl font-bold text-white">
              {currentWord}
              <span className="animate-pulse">|</span>
            </span>
          </div>
        </div>
      </section>

      <UpcomingTrips />
      <WeekendTrips />
      <ExploreWithUs />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Home;