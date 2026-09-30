import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={styles.container}>
      <Head>
        <title>দোকান ম্যানেজমেন্ট সিস্টেম</title>
        <meta name="description" content="দোকান স্টক ও হিসাব পোর্টাল" />
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>দোকান ম্যানেজমেন্ট পোর্টালে স্বাগতম</h1>
        <p style={styles.description}>
          আপনার স্টক ও দৈনন্দিন হিসাব পরিচালনা করুন সহজে।
        </p>

        <div style={styles.grid}>
          <Link href="/add" style={styles.card}>
            <h2>পণ্য যুক্ত করুন &rarr;</h2>
            <p>নতুন স্টক বা আইটেমের তথ্য সিস্টেমে এন্ট্রি করুন।</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '0 1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    backgroundColor: '#f8fafc',
  },
  main: {
    padding: '3rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    lineHeight: 1.15,
    fontSize: '2.5rem',
    textAlign: 'center',
    color: '#0f172a',
  },
  description: {
    textAlign: 'center',
    margin: '1.5rem 0',
    lineHeight: 1.5,
    fontSize: '1.2rem',
    color: '#475569',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '800px',
    marginTop: '2rem',
  },
  card: {
    margin: '1rem',
    padding: '1.5rem',
    textAlign: 'left',
    color: '#1e293b',
    textDecoration: 'none',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    transition: 'color 0.15s ease, border-color 0.15s ease',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
};
