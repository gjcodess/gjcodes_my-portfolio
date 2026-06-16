import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { favoritesData } from '../../data/personalContent';
import styles from './Favorites.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────
   Audio Player Component
   ───────────────────────────────────── */
function AudioPlayer({ src, albumArt, title, artist }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [waveDelays] = useState(() =>
    Array.from({ length: 36 }).map(() => `${Math.random() * 0.8}s`)
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  const skip = useCallback((delta) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + delta, 0), duration);
  }, [duration]);

  const handleSeek = useCallback((e) => {
    const audio = audioRef.current;
    const bar = e.currentTarget;
    if (!audio || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * duration;
  }, [duration]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.playerCard}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Album art */}
      <div className={styles.playerArtWrapper}>
        {albumArt ? (
          <img
            src={albumArt}
            alt={`${title} album art`}
            className={styles.playerArt}
            loading="lazy"
          />
        ) : (
          <div className={styles.playerArtPlaceholder}>♫</div>
        )}
      </div>

      <div className={styles.playerContent}>
        {/* Track info */}
        <div className={styles.playerInfo}>
          <div className={styles.playerTitle}>{title}</div>
          <div className={styles.playerArtist}>{artist}</div>
        </div>

        {/* Progress bar */}
        <div className={styles.playerProgress} onClick={handleSeek}>
          <div className={styles.waveContainer}>
            {waveDelays.map((delay, i) => {
              const isFilled = duration > 0 ? (i / waveDelays.length) * 100 <= progress : false;
              return (
                <div
                  key={i}
                  className={`${styles.waveBar} ${isFilled ? styles.waveBarFilled : ''} ${isPlaying ? styles.waveBarAnimated : ''}`}
                  style={{ animationDelay: delay }}
                />
              );
            })}
          </div>
        </div>

        {/* Transport controls */}
        <div className={styles.playerControls}>
          <button
            className={styles.controlBtn}
            onClick={() => skip(-10)}
            aria-label="Skip back 10 seconds"
          >
            <SkipBack size={28} />
          </button>

          <button
            className={`${styles.controlBtn} ${styles.playBtn}`}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={26} /> : <Play size={26} />}
          </button>

          <button
            className={styles.controlBtn}
            onClick={() => skip(10)}
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Favorites Section
   ───────────────────────────────────── */
function Favorites() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const movieRef = useRef(null);
  const musicRef = useRef(null);

  const { movie, music } = favoritesData;

  // Header reveal
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  // Block reveals
  useEffect(() => {
    [movieRef, musicRef].forEach((ref) => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === movieRef.current ||
          st.trigger === musicRef.current
        ) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section className={styles.section} id="favorites" ref={sectionRef}>
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.header} ref={headerRef}>
          <span className={styles.headerLabel}>// Favorites</span>
          <h2 className={styles.headerTitle}>Things That Move Me</h2>
          <p className={styles.headerSubtitle}>
            The stories and sounds that shaped my perspective.
          </p>
        </div>

        {/* ── Movie Block ── */}
        <div className={styles.favoriteBlock} ref={movieRef}>
          <div className={styles.mediaColumn}>
            <div className={styles.videoWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${movie.youtubeId}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className={styles.contentColumn}>
            <h3 className={styles.sectionLabel}>
              {movie.label.split(' ').slice(0, -1).join(' ')}{' '}
              <span className={styles.sectionLabelAccent}>
                {movie.label.split(' ').slice(-1).join(' ')}
              </span>
            </h3>
            <span className={styles.sectionSubtitle}>{movie.title}</span>

            <blockquote className={styles.blockquote}>
              {movie.quote}
              <cite className={styles.quoteAuthor}>~ {movie.quoteAuthor}</cite>
            </blockquote>

            <p className={styles.descriptionText}>{movie.description}</p>

            <a
              href={movie.readMoreUrl}
              className={styles.readMoreBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        </div>

        {/* ── Music Block (reversed) ── */}
        <div className={`${styles.favoriteBlock} ${styles.favoriteBlockReversed}`} ref={musicRef}>
          <div className={styles.contentColumn}>
            <h3 className={styles.sectionLabel}>
              {music.label.split(' ').slice(0, -1).join(' ')}{' '}
              <span className={styles.sectionLabelAccent}>
                {music.label.split(' ').slice(-1).join(' ')}
              </span>
            </h3>
            <span className={styles.sectionSubtitle}>{music.title}</span>

            <blockquote className={styles.blockquote}>
              {music.quote}
              <cite className={styles.quoteAuthor}>~ {music.quoteAuthor}</cite>
            </blockquote>

            <p className={styles.descriptionText}>{music.description}</p>

            <a
              href={music.readMoreUrl}
              className={styles.readMoreBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>

          <div className={styles.mediaColumn}>
            <AudioPlayer
              src={music.audioSrc}
              albumArt={music.albumArt}
              title={music.title}
              artist={music.artist}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Favorites;
