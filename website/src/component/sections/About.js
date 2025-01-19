function About() {
  return (
    <div class="flex flex-col pl-5">
      <div>
        <h2 class="font-bold text-3xl">About</h2>
      </div>
      <div class="pl-3">
        <p>
          Steam Shark is an open source database to list scam and trust worthy
          websites realated to steam. There are tree possible states:{" "}
        </p>
        <ul class="pl-3">
          <li> Trust worthy website</li>
          <li> Scam website</li>
          <li> Not registered website</li>
        </ul>
        <p class="text-xs pl-10">
          If you access an website that is not in database yet, you can register
          it. Know more how to register the website into the database{" "}
          <a
            target="_blank"
            href="https://github.com/Franciscoborges2002/steamShark/blob/main/CONTRIBUTING.md"
            class="transition-all delay-50 text-purple-500 hover:text-purple-600 hover:underline"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default About;
