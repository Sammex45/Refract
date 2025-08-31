import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="Refract – A Reactive, Composable JS Framework"
      description="Refract is a reactive, composable JavaScript framework for building user interfaces with clarity.">
      
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">Refract</h1>
          <p className="hero__subtitle">Reactive. Composable. Clear.</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/category/getting---started">
              🚀 Get Started
            </Link>
            <Link
              className="button button--outline button--lg margin-left--sm"
              to="/docs/Learn-more/">
              📖 Learn More
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              
              <div className={clsx('col col--4')}>
                <div className="text--center">
                  <h3>⚡ Compiler Optimization</h3>
                  <p>
                    Refract comes with a lightweight compiler that optimizes your
                    UI at build-time for blazing-fast performance.
                  </p>
                </div>
              </div>
              
              <div className={clsx('col col--4')}>
                <div className="text--center">
                  <h3>🔄 Stream-based Updates</h3>
                  <p>
                    Built-in support for reactive streams allows UI to respond
                    instantly to data flow without unnecessary re-renders.
                  </p>
                </div>
              </div>
              
              <div className={clsx('col col--4')}>
                <div className="text--center">
                  <h3>🎨 Declarative Animations</h3>
                  <p>
                    Animate UI transitions with clarity using Refract’s
                    declarative animation API—no extra libraries required.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container text--center">
            <h2>Start Building with Refract Today</h2>
            <p>
              Modern, scalable, and reactive—Refract helps you build user
              interfaces with clarity and precision.
            </p>
            <Link className="button button--primary button--lg" to="/docs/category/getting---started">
              Get Started →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
