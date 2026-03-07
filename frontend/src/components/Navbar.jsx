/* eslint-disable no-unused-vars */
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import knkLogo from '../assets/file_000000009b94720784d2ef29a08ad1c8.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/#about', label: 'About' },
        { to: '/packages', label: 'Packages' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/contact', label: 'Contact' },
    ];

    const isActive = (link) =>
        link.to.includes('#')
            ? location.pathname + location.hash === link.to
            : location.pathname === link.to;

    const renderLink = (link, i, mobile = false) => {
        const active = isActive(link);
        const isHash = link.to.includes('#');

        const cls = mobile
            ? `block w-full text-left px-5 py-3.5 rounded-xl font-semibold text-base transition-all ${active ? 'text-amber-300 bg-white/10' : 'text-amber-100/90 hover:text-amber-300 hover:bg-white/8'}`
            : `relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-lg ${active ? 'text-amber-300' : 'text-amber-100/90 hover:text-amber-300'}`;

        const el = (
            <>
                {link.label}
                {!mobile && active && (
                    <motion.span
                        layoutId="underline"
                        className="absolute bottom-0 left-2 right-2 rounded-full"
                        style={{ height: '2px', background: 'linear-gradient(90deg,#fbbf24,#f59e0b)' }}
                    />
                )}
            </>
        );

        if (isHash) return <a key={i} href={link.to} className={cls} onClick={() => setMobileOpen(false)}>{el}</a>;
        return <Link key={i} to={link.to} className={cls} onClick={() => setMobileOpen(false)}>{el}</Link>;
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                background: scrolled
                    ? 'linear-gradient(135deg,rgba(78,30,5,0.97) 0%,rgba(110,45,8,0.97) 50%,rgba(78,30,5,0.97) 100%)'
                    : 'linear-gradient(135deg,rgba(60,22,3,0.88) 0%,rgba(95,38,6,0.88) 50%,rgba(60,22,3,0.88) 100%)',
                backdropFilter: 'blur(20px)',
                borderBottom: scrolled ? '1px solid rgba(251,191,36,0.4)' : '1px solid rgba(251,191,36,0.15)',
                boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5),0 1px 0 rgba(251,191,36,0.2)' : 'none',
            }}
        >
            {/* Top gold shimmer */}
            <div style={{ height: '2px', background: 'linear-gradient(90deg,transparent 0%,#fbbf24 30%,#fde68a 50%,#fbbf24 70%,transparent 100%)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between" style={{ height: '70px' }}>

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                        <img
                            src={knkLogo}
                            alt="KNK Trip Cart"
                            style={{
                                height: '56px',
                                width: 'auto',
                                filter: 'drop-shadow(0px 0px 8px rgba(251,191,36,0.5))',
                                objectFit: 'contain',
                            }}
                        />
                        <span
                            className="hidden sm:block text-xl md:text-2xl font-bold tracking-wider text-amber-300 uppercase"
                            style={{ fontFamily: 'Outfit, Poppins, sans-serif' }}
                        >
                            KNK Trip Cart
                        </span>
                    </Link>

                    {/* Desktop nav - Hidden on small screens, flex on large */}
                    <nav className="items-center gap-1" style={{ display: isDesktop ? 'flex' : 'none' }}>
                        {navLinks.map((link, i) => renderLink(link, i))}
                    </nav>

                    {/* Mobile burger - Flex on small screens, hidden on large */}
                    <button
                        className="flex items-center justify-center w-11 h-11 rounded-lg"
                        style={{
                            display: isDesktop ? 'none' : 'flex',
                            background: 'rgba(251,191,36,0.15)',
                            color: '#fbbf24',
                            border: '1px solid rgba(251,191,36,0.3)'
                        }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                    </button>
                </div>
            </div>

            {/* Bottom gold shimmer */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(251,191,36,0.35),transparent)' }} />

            {/* Mobile dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            background: 'linear-gradient(135deg,rgba(60,22,3,0.98),rgba(95,38,6,0.98))',
                            borderBottom: '1px solid rgba(251,191,36,0.25)',
                            backdropFilter: 'blur(20px)',
                            overflow: 'hidden',
                        }}
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    {renderLink(link, i, true)}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
export default Navbar;
