<h1 align='center'>
  🦈steamShark
</h1>

<h3 align='center'>
  The script that smells scam websites!
</h3>

<p align='center'>
You can access the <a href="https://franciscoborges2002.github.io/steamShark/" target="_blank">Website</a>.
</p>

<p align='center'>
  <a href="https://github.com/sponsors/alexandresanlim"><img alt="version" src="https://img.shields.io/badge/Version-1.0.0-blue" /></a>
  &nbsp;
  <a href="https://github.com/sponsors/alexandresanlim"><img alt="Sponsor" src="https://img.shields.io/badge/Opensource-green" /></a>
</p>
<br />

<!-- HEADER SECTION -->
<nav>
    <a href="#description">Description</a> |
    <a href="#howToInstall">How to Install</a> |
    <a href="#features">Features</a> |
    <a href="#howItWorks">How It Works</a> |
    <a href="#roadMap">Road Map</a> |
    <a href="#contributing">Contributing</a>
</nav>

<!-- DESCRIPTION -->
<div id="description">
    <!-- HEADER -->
    <div>
        <h2>📝 Description</h2>
    </div>
    <!-- CONTENT -->
    <div>
        steamShark is an extension to prevent scams in the steam ecosytstem.
    </div>
</div>

<!-- HOW TO INSTALL -->
<div id="howToInstall">
    <!-- HEADER -->
    <div>
        <h2>⬇️ How to Install</h2>
    </div>
    <!-- CONTENT -->
    <div>
        You can either choose to install via:
        <ul>
            <!-- <li><a href="#installTampermonkey">Tampermonkey</a></li> -->
            <li><a href="#installExtension">Extension</a></li>
        </ul>

<!-- <div id="installTampermonkey">
<h3>Tampermonkey</h3>

### Pre-requesites

Have Tampermonkey installed, you can download it through the [official website](https://www.tampermonkey.net/). -->

### Installing the script

You just need to install it via tampermonkey

</div>

<div id="installExtension">
<h3>Extension</h3>

You just need to go to the following page and add the extension to your web browser
[steamShark](https://www.google.com).

</div>

And it's done!

</div>

</div>

<!-- FEATURES -->
<div id="features">
    <!-- HEADER -->
    <div>
        <h2>⚙️ Features</h2>
    </div>
    <!-- CONTENT -->
    <div>
        <ul>
            <li>
            To complete
            </li>
        </ul>
    </div>
</div>

<!-- HOW IT WORKS -->
<div id="howItWorks">
    <!-- HEADER -->
    <div>
        <h2>🛠️ How It Works?</h2>
    </div>
    <!-- CONTENT -->
    <div>
        <p>At the core of the project are 2 json files. One containing the trusted websites, the other one containing scam websites.</p>
        <p>The script gets those 2 json files from the github repository. After that fetchs the data when you are active and makes that automatically from hour to hour.</p>
        <p>Then just scouts those 2 files to check if the websites is present in one of those lists nad BOOM!</p>
        <p>If the website is not present in the lists but have in url one part that contains in <code>./utils/suspicious</code> will appear a popup to warn the person and to ask to add to the database.</p>
    </div>
</div>

<!-- HOW IT WORKS -->
<div id="roadMap">
    <!-- HEADER -->
    <div>
        <h2>🛣️ Road Map</h2>
    </div>
    <!-- CONTENT -->
    <div>
        <ul>
            <h3>Current version 1.0.1</h3>
            <li>
                [x] Finish the base application
            </li>
            <li>
                [ ] Publish on marketplaces of extensions to people to use.
            </li>
            <li>
                [ ] Create an steam bot so users can contribute to the lists as well.
            </li>
            <li>
                [ ] Specify more information on both official and scam websites, so users can read more about them in the website.
            </li>
        </ul>
    </div>
    <div>
        You can see the <a href="./CHANGELOG.md">changelog</a> on github.
    </div>
</div>

<!-- CONTRIBUTING -->
<div id="contributing">
    <!-- HEADER -->
    <div>
        <h2>🤝 Contributing</h2>
    </div>
    <!-- CONTENT -->
    <div>
        <p>

Everyone is more than welcome to contribute to the project, but for an organized participation, it's important to read the [contributing document](./CONTRIBUTING.md) before doing it!

</p>

</div>

</div>

<style>
nav{
    display: flex;
    flex-direction: row;
    gap: 20px;
}
</style>
