import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        <header className="container">
          <p className="header-s1">
            Hello, I'm
          </p>
          <p className="header-s2">Luke Trenaman</p>
          <p className="header-s3">Welcome to my <b>epic</b> website.</p>
        </header>
        <main className="mx-auto">
          <section className="container">
            <div className="row wrapper">
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="https://interalliance.org"><img src="thumbnails/ia_site.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="https://interalliance.org">INTERalliance</a>
                      <i className="fa fa-desktop right-info"></i>
                      <i className="fas fa-mobile-alt right-info"></i>
                    </div>
                    <span className="tag tag-webpage" title="This project is a website, just like the one you're on now ;)">Website</span>
                    <span className="tag tag-date" title="Finished on Aug 9th, 2022">Aug. 2022</span>
                    <div className="game-tagline">Worked at INTERalliance to implement a redesigned website.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="https://masonstudentactivities.github.io"><img src="thumbnails/site.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="https://masonstudentactivities.github.io">Mason Student Activities</a>
                      <a href="https://github.com/masonstudentactivities/masonstudentactivities.github.io"><i className="fa fa-github right-info"></i></a>
                      <i className="fa fa-desktop right-info"></i>
                      <i className="fas fa-mobile-alt right-info"></i>
                    </div>
                    <span className="tag tag-webpage" title="This project is a website, just like the one you're on now ;)">Website</span>
                    <span className="tag tag-date" title="Finished on May 17th, 2022">May 2022</span>
                    <div className="game-tagline">Volunteered at my school to redesign the student activities website.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="https://brainfoodgame.github.io/"><img src="thumbnails/brain_food.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="https://brainfoodgame.github.io/">Brain Food</a>
                      <i className="fa fa-desktop right-info"></i>
                    </div>
                    <span className="tag tag-game" title="This is a game, playable in your browser!">Game</span>
                    <span className="tag tag-date" title="Finished on March 12, 2022">Mar. 2022</span>
                    <div className="game-tagline">Build and launch burgers in a post-apocalyptic diner.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="https://geofare.github.io/"><img src="thumbnails/geofare.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="https://geofare.github.io">GeoFare</a>
                      <a href="https://github.com/geofare/geofare.github.io"><i className="fa fa-github right-info"></i></a>
                      <i className="fa fa-desktop right-info"></i>
                      <i className="fas fa-mobile-alt right-info"></i>
                    </div>
                    <span className="tag tag-webpage" title="This project is a webpage, just like the one you're on now ;)">Webpage</span>
                    <span className="tag tag-date" title="Finished on March 27, 2022">Mar. 2022</span>
                    <div className="game-tagline">Food bank map made for HooHacks 2022.
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="rotator/"><img src="thumbnails/rotator.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="rotator/">Rotator</a>
                      <a href="https://github.com/luketrenaman/rotator"><i className="fa fa-github right-info"></i></a>
                      <i className="fa fa-desktop right-info"></i>
                      <i className="fas fa-mobile-alt right-info"></i>
                    </div>
                    <span className="tag tag-game" title="This is a game, playable in your browser!">Game</span>
                    <span className="tag tag-date" title="Finished on August 31st, 2021">Aug. 2021</span>
                    <div className="game-tagline">A bullet hell where you control the bullets.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="snakemaze/snakemaze/"><img src="thumbnails/snakemaze.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="snakemaze/snakemaze/">Snake Maze</a>
                      <a href="https://github.com/luketrenaman/snakemaze"><i className="fa fa-github right-info"></i></a>
                      <i className="fa fa-desktop right-info"></i></div>
                    <span className="tag tag-game" title="This is a game, playable in your browser!">Game</span>
                    <span className="tag tag-date" title="Finished on March 29th, 2020">Mar. 2020</span>
                    <div className="game-tagline">Snake, but a maze! Get the gems to escape.</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="luketris/"><img src="thumbnails/luketris.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="luketris/">Luketris</a>
                      <a href="https://github.com/luketrenaman/luketris"><i className="fa fa-github right-info"></i></a>
                      <i className="fa fa-desktop right-info"></i>
                      <i className="fas fa-mobile-alt right-info"></i>
                    </div>
                    <span className="tag tag-game" title="This is a game, playable in your browser!">Game</span>
                    <span className="tag tag-date" title="March 6th, 2020">Mar. 2020</span>
                    <div className="game-tagline">Tetris, but I’m the pieces!</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="ducksouls/"><img src="thumbnails/duck_souls.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="ducksouls/">Duck Souls</a>
                      <a href="https://github.com/luketrenaman/ducksouls"><i className="fa fa-github right-info"></i></a>
                      <i className="fa fa-desktop right-info"></i></div>
                    <span className="tag tag-game" title="This is a game, playable in your browser!">Game</span>
                    <span className="tag tag-date" title="Finished on August 29th, 2021">Aug. 2021</span>
                    <div className="game-tagline">A souls-like game featuring the amazing art of Gabe Salazar.</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="https://github.com/luketrenaman/cloudkeys"><img src="thumbnails/cloud_keys.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="https://github.com/luketrenaman/cloudkeys">Cloud Keys</a>
                      <a href="https://github.com/luketrenaman/cloudkeys"><i className="fa fa-github right-info"></i></a></div>
                    <span className="tag tag-code" title="A repository cannot be run on web, but has its code openly available.">Repository</span>
                    <span className="tag tag-date" title="Finished on June 27, 2019">June 2019</span>
                    <div className="game-tagline">A realtime streaming service for MIDI keyboard performances.</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="archives/tandem"><img src="thumbnails/tandem.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="archives/tandem">Tandem</a>
                      <a href="https://github.com/luketrenaman/archives"><i className="fa fa-github right-info"></i></a>
                      <i className="fa fa-desktop right-info"></i></div>
                    <span className="tag tag-game" title="This is a game, playable in your browser!">Game</span>
                    <span className="tag tag-date" title="Finished on September 25th, 2018">Sep. 2018</span>
                    <div className="game-tagline">A cooperative rhythm game featuring original music.</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="archives/2d/"><img src="thumbnails/platformer.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="archives/2d">Platformer Engine</a>
                      <a href="https://github.com/luketrenaman/archives"><i className="fa fa-github right-info"></i></a>
                      <i className="fa fa-desktop right-info"></i></div>
                    <span className="tag tag-game" title="This is a game, playable in your browser!">Game</span>
                    <span className="tag tag-date" title="Finished on December 2nd, 2018">Dec. 2018</span>
                    <div className="game-tagline">A custom platformer engine with camera interpolation and physics.</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div className="game-card">
                  <a href="archives/conway/"><img src="thumbnails/conways.png" /></a>
                  <div className="game-blurb">
                    <div className="game-title"><a href="archives/conway/">Conway's Game</a>
                      <a href="https://github.com/luketrenaman/archives"><i className="fa fa-github right-info"></i></a>
                      <i className="fa fa-desktop right-info"></i>
                      <i className="fas fa-mobile-alt right-info"></i>
                    </div>
                    <span className="tag tag-webpage" title="This project is a webpage, just like the one you're on now ;)">Webpage</span>
                    <span className="tag tag-date" title="Finished on December 2nd, 2018">Dec. 2018</span>
                    <div className="game-tagline">A small simulation of the Conway's Game Of Life simulation.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer>
        <hr className="margin-side-vw" />
      </footer>
    </>
  )
}
