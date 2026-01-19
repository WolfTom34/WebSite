import { Suspense } from 'react'
import { Router, Route, Switch } from "wouter"
import { Atmosphere } from './infrastructure/scene/atmosphere'
import { Scene } from './infrastructure/scene/scene'
import { AudioProvider } from './shared/context/audio-context'
import { TransmissionProvider } from './shared/context/transmission-context'
import { BootSequenceProvider, useBootSequence } from './shared/context/boot-sequence-context'
import { InteractionProvider } from './shared/context/interaction-context'
import { LanguageProvider } from './shared/context/language-context'
import { CoreLattice } from './infrastructure/scene/core-lattice'
import { GamifiedHUD } from './infrastructure/ui/gamified-hud'
import { ConstellationNav } from './infrastructure/ui/constellation-nav'
import { GlobalSoundManager } from './infrastructure/audio/global-sound-manager'
import { WorkPage } from './infrastructure/ui/pages/work-page'
import { GalleryPage } from './infrastructure/ui/pages/gallery-page'
import { PartnersPage } from './infrastructure/ui/pages/partners-page'
import { BlogPage } from './infrastructure/ui/pages/blog-page'
import { AudioUnlockOverlay } from './infrastructure/ui/components/audio-unlock-overlay'
import { SEOHead } from './infrastructure/ui/components/seo-head'
import { SEOProvider } from './shared/context/seo-context'
import { SEORenderer } from './infrastructure/ui/components/seo-renderer'
import { BootLoader } from './infrastructure/ui/components/boot-loader'




function App() {
    return (
        <div className="orbital-os-container">
            <BootSequenceProvider>
                <SEOProvider>
                    <SEORenderer />
                    <SEOHead
                        title="Control Terminal"
                        description="Advanced Autonomous Robotics & Defense Systems. The Safe Valley Operating System - SVE."
                    />
                    <InteractionProvider>
                        <LanguageProvider>
                            <Router>
                                <TransmissionProvider>
                                    <AudioProvider>
                                        <Scene>
                                            <Atmosphere />
                                            <CoreLattice />

                                            <Suspense fallback={null}>
                                                <ConstellationNav />
                                                <GlobalSoundManager />
                                            </Suspense>

                                            <Switch>
                                                <Route path="/" component={() => null} />
                                                <Route path="/work" component={WorkPage} />
                                                <Route path="/gallery" component={GalleryPage} />
                                                <Route path="/partners" component={PartnersPage} />
                                                <Route path="/blog" component={BlogPage} />
                                            </Switch>
                                        </Scene>
                                        <BootLoader />
                                        <GamifiedHUD />
                                        <AudioUnlockOverlay />
                                    </AudioProvider>
                                </TransmissionProvider>
                            </Router>
                        </LanguageProvider>
                    </InteractionProvider>
                </SEOProvider>
            </BootSequenceProvider>
        </div>
    )
}

export default App
