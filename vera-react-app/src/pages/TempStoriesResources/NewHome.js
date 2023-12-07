import React, { useState, useEffect } from 'react';
import './HomePage.css';
import bg from '../../components/Banner/bannerBackground.jpg';
import veraLogo from '../../components/Banner/draftLogo.png';
import { Banner, CategoryButtonGroup, ResourcePageTileGroup} from '../../components/components'

function NewHome() {

    // Hook to keep track of the categories to be loaded from the database.
    const [categorNames, setCategorNames] = useState([])

    // Hook to keep track of subresourceDict.
    // subresourceDict makes a dictionary mapping the IDs of
    // the subrsrcs objects to the full subrsrcs objects.
    const [subresourceDict, setSubresourceDict] = useState({})

    // Hook to track nameToID.
    // nameToID is a dictionary mapping the category names to
    // the corresponding array of subresource IDs
    const [nameToID, setNameToID] = useState({})

    // This hook will execute before the other one.
    // It fetches the subrsrcs data and stores it into subresourceDict for later use.
    useEffect( () => {
        fetch('http://localhost:3001/resources/subrsrcs')
        .then(response => response.json())
        .then(json => {
            // Create a dictionary using subresource id as the key
            // mapping to the full subresource object.
            let tempDict = {}
            tempDict = json.reduce((acc, obj) => {
                acc[obj._id] = obj;
                return acc;
            }, {});
            setSubresourceDict(tempDict)
        })
      }, [])

    // Hook which executes fetch (GET) to the database and is only
    // run upon the very first render of the website.
    useEffect(() => {
        fetch('http://localhost:3001/resources/generalrsrcscat')
          .then(response => response.json())
          .then(json => {
            let tempArray = []
            let tempNameToID = {}
            for (let object in json)
            {
                let name = json[object]["Title"]
                tempArray.push(name)
                tempNameToID[name] = json[object]["SubCategoryIDList"]
            }
            setNameToID(tempNameToID)
            setCategorNames(tempArray)
          })
          .catch(error => console.error(error))
      }, [])

    return (
        <div class="everything row">
            <div class="col-lg-12 col-12 main">
                <div id="home" class="home">
                    <div class="top-logo">
                        <img class="animate__animated animate__fadeInUp" src="Images/logo.png"></img>
                    </div>
                    <div class="row main-content">
                        <div class="col-6">
                            <div class="row">
                                <div class="col-8 blurb">
                                    <div>
                                        <h2 style="font-family: fat; color: #08376B;">Articles</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
                                    </div>
                                </div>
                                <div class="col-4 number d-flex justify-content-center align-items-center">
                                    <div style="padding: 5vh;">
                                        <h1 class="text-left" style="color: #d8d8d8;">134</h1>
                                        <p class="text-left" style="font-family: skinny;">Articles Written</p>
                                    </div>
                                </div>
                                <div class="col-12 newsletter filters">
                                    <h2 style="font-family: fat; color: #08376B; margin-top: 3vh;">Filters</h2>
                                    <div class="d-flex align-items-center" style="height: 70%;">
                                        <div>
                                            <button class="btn btn-primary filter-btn">Biology</button>
                                            <button class="btn btn-primary filter-btn">Cells</button>
                                            <button class="btn btn-primary filter-btn">Inventions</button>
                                            <button class="btn btn-primary filter-btn">Discoveries</button>
                                            <button class="btn btn-primary filter-btn">Biotech</button>
                                            <button class="btn btn-primary filter-btn">Technology</button>
                                            <button class="btn btn-primary filter-btn">New</button>
                                            <button class="btn btn-primary filter-btn">Latest</button>
                                            <button class="btn btn-primary filter-btn">Politics</button>
                                            <button class="btn btn-primary filter-btn">Best</button>
                                            <button class="btn btn-primary filter-btn">Library</button>
                                            <button class="btn btn-primary filter-btn">Technology</button>
                                            <button class="btn btn-primary filter-btn">Biology</button>
                                            <button class="btn btn-primary filter-btn">Cells</button>
                                            <button class="btn btn-primary filter-btn">Inventions</button>
                                            <button class="btn btn-primary filter-btn">Discoveries</button>
                                            <button class="btn btn-primary filter-btn">Biotech</button>
                                            <button class="btn btn-primary filter-btn">Hello</button>
                                            <button class="btn btn-primary filter-btn">Filter</button>
                                            <button class="btn btn-primary filter-btn">Business</button>
                                            <button class="btn btn-primary filter-btn">Economics</button>
                                            <button class="btn btn-primary filter-btn">Animals</button>
                                            <button class="btn btn-primary filter-btn">Plants</button>
                                            <button class="btn btn-primary filter-btn">Bacteria</button>
                                            <button class="btn btn-primary filter-btn">Kingdom</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6" style="padding: 0px;">
                            <div class="col-12 navsection">
                                <div>
                                    <a href="index.html">HOME</a>
                                </div>
                                <div>
                                    <a href="about.html">ABOUT</a>
                                </div>
                                <div>
                                    <a href="articles.html" style="color: black;">ARTICLES</a>
                                </div>
                                <div>
                                    <a href="contact.html">CONTACT</a>
                                </div>
                            </div>
                            <div class="row team articles">
                                <div class="col-6 team-member">
                                    <div>
                                        <img src="Images/default.jpg"></img>
                                        <p></p>
                                        <h2 class="text-center" style="font-family: fat;"><a href="" style="color: #08376B;">Article Title One</a></h2>
                                        <p class="text-center" style="color: black;">March 26th, 2019</p>
                                    </div>
                                </div>
                                <div class="col-6 team-member">
                                    <div>
                                        <img src="Images/default.jpg"></img>
                                        <p></p>
                                        <h2 class="text-center" style="font-family: fat;"><a href="" style="color: #08376B;">Article Title One</a></h2>
                                        <p class="text-center" style="color: black;">March 26th, 2019</p>
                                    </div>
                                </div>
                                <div class="col-6 team-member">
                                    <div>
                                        <img src="Images/default.jpg"></img>
                                        <p></p>
                                        <h2 class="text-center" style="font-family: fat;"><a href="" style="color: #08376B;">Article Title One</a></h2>
                                        <p class="text-center" style="color: black;">March 26th, 2019</p>
                                    </div>
                                </div>
                                <div class="col-6 team-member">
                                    <div>
                                        <img src="Images/default.jpg"></img>
                                        <p></p>
                                        <h2 class="text-center" style="font-family: fat;"><a href="" style="color: #08376B;">Article Title One</a></h2>
                                        <p class="text-center" style="color: black;">March 26th, 2019</p>
                                    </div>
                                </div>
                                <div class="col-6 team-member">
                                    <div>
                                        <img src="Images/default.jpg"></img>
                                        <p></p>
                                        <h2 class="text-center" style="font-family: fat;"><a href="" style="color: #08376B;">Article Title One</a></h2>
                                        <p class="text-center" style="color: black;">March 26th, 2019</p>
                                    </div>
                                </div>
                                <div class="col-6 team-member">
                                    <div>
                                        <img src="Images/default.jpg"></img>
                                        <p></p>
                                        <h2 class="text-center" style="font-family: fat;"><a href="" style="color: #08376B;">Article Title One</a></h2>
                                        <p class="text-center" style="color: black;">March 26th, 2019</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	    </div>
    );
}

export default NewHome;