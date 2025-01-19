function Hero() {
    return (
        <div class="flex flex-col items-center gap-1">
            <p class="text-3xl">🦈</p>
            <h1 class="font-bold text-6xl">Steam Shark</h1>
            <p class="font-semibold text-2xl">The tool that smells scam websites!</p>
            
            <div class="flex flex-row gap-2 items-center pt-5">
                <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    Version 1.0.0
                </span>
                <span
                    class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Opensource
                </span>
            </div>
        </div>
    )
}

export default Hero;