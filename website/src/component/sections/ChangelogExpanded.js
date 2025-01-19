function ChangelogExpanded() {
    return(
        <div class="flex flex-col pl-5">
            {/* <!-- HEADER --> */}
            <div>
                <h2 class="font-bold text-3xl">Changelog</h2>
            </div>
            {/* <!-- VERSIONS --> */}
            <div class="pl-3">
                {/* <!-- VERSION 1.0.0 --> */}
                <div>
                    {/* <!-- VERSION NUMBER --> */}
                    <div>
                        <h3 class="font-semibold text-xl">Version 1.0.0 - Begin</h3>
                    </div>
                    {/* <!-- CHANGES --> */}
                    <div>
                        <ul class="list-disc">
                            <li>Have a list with official and scam websites.</li>
                            <li>Have the script to detect the type of website within the lists.</li>
                            <li>Show a popup when the user enters the ofiicial website.</li>
                            <li>Redirect the user when enters an scam website.
                                <ul class="list-disc pl-5 text-sm">
                                    <li>Redirect the user to a warning page.</li>
                                    <li>Let the user skip the warning and use the website.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChangelogExpanded;