/* eslint-disable no-unused-vars */
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import knkLogo from '../assets/file_000000009b94720784d2ef29a08ad1c8.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/#about', label: 'About' },
        { to: '/packages', label: 'Packages' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/contact', label: 'Contact' },
    ];

    const renderLink = (link, i) => {
        const isHash = link.to.includes('#');
        const isActive = isHash
            ? location.pathname + location.hash === link.to
            : location.pathname === link.to;

        const cls = 'relative px-4 py-2 text-sm font-bold tracking-wide uppercase transition-all duration-300 rounded-lg hover:bg-white/10';
        const style = { color: isActive ? '#fbbf24' : '#fef3c7', letterSpacing: '0.06em' };

        if (isHash) {
            return <a key={i} href={link.to} className={cls} style={style}>{link.label}</a>;
        }
        return <Link key={i} to={link.to} className={cls} style={style}>{link.label}</Link>;
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                background: scrolled
                    ? 'linear-gradient(135deg, rgba(120,53,15,0.98) 0%, rgba(146,64,14,0.98) 100%)'
                    : 'linear-gradient(135deg, rgba(92,38,8,0.85) 0%, rgba(120,53,15,0.85) 100%)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(251,191,36,0.25)',
                boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.35)' : 'none',
            }}
        >
            {/* Gold accent line at top */}
            <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, #fbbf24, #f59e0b, #fbbf24, transparent)' }} />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between" style={{ height: '72px' }}>

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <motion.img
                            src={knkLogo}
                            alt="KNK Trip Cart"
                            style={{ height: '58px', width: 'auto', filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(10deg)' }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                    </Link>

                    {/* All nav links — always visible */}
                    <nav className="flex items-center gap-1">
                        {navLinks.map((link, i) => renderLink(link, i))}
                    </nav>
                </div>
            </div>

            {/* Gold accent line at bottom */}
            <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.4), transparent)' }} />
        </header>
    );
};
export default Navbar;
