function Instalattion() {
  return (
    <div class="flex flex-col pl-5">
      {/* <!-- HEADER --> */}
      <div>
        <h2 class="font-bold text-3xl">Installation</h2>
      </div>
      {/* <!-- CONTENT --> */}
      <div class="flex flex-col">
        {/* <!-- EXTENSION --> */}
        <div>
          {/* <!-- HEADER EXTENSION --> */}
          <div class="pl-3">
            <h3 class="font-semibold text-xl">Extension</h3>
          </div>
          {/* <!-- CONTENT EXTENSION --> */}
          <div class="pl-6">
            <p>Download extension </p>
            <ul class="list-disc pl-5">
              <li>
                <a
                  href="#"
                  target="_blank"
                  class="transition-all delay-50 text-purple-500 hover:text-purple-600 hover:underline"
                >
                  Chrome
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/*  <!-- TAMPERMONKEY --> */}
        <div>
          {/*  <!-- HEADER TAMPERMONKEY --> */}
          {/* <div class="pl-3">
            <h3 class="font-semibold text-xl">Tampermonkey</h3>
          </div> */}
          {/* <!-- CONTENT TAMPERMONKEY --> */}
          {/* <div class="pl-6"> */}
            {/* <!-- PRE-REQUESITES SECTION --> */}
            {/* <div>
              <h4 class="font-medium text-xl">Pre-requesites</h4>
              
              <ol class="pl-8">
                <li>1. Have Tampermonkey installed!</li>
                <p class="text-xs px-5">
                  You can download it through the{" "}
                  <a
                    href="https://www.tampermonkey.net/"
                    class="transition-all delay-50 text-purple-500 hover:text-purple-600 hover:underline"
                  >
                    official website
                  </a>
                  .
                </p>
              </ol> 
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  );
}

export default Instalattion;
