const Architecture = () => {
    const handleGithubOnClick = () => {
        window.open("https://github.com/parthstark", "_blank");
    };

    return (
        <div className="bg-gray-50 h-screen flex items-center justify-center pb-10">
            <img
                src="src/assets/arch.drawio.png"
                alt="Architecture"
                className="sm:rotate-0 rotate-90 sm:h-10/12 border border-gray-300 border-dashed bg-white px-16 py-8 shadow rounded-xl scale-125 sm:scale-100"
            />
            <div className="sm:rotate-0 rotate-90 cursor-pointer absolute sm:bottom-5 bottom-15 flex flex-col items-center justify-center hover:scale-110 transition"
                onClick={handleGithubOnClick}>
                <img
                    src="src/assets/github-logo.png"
                    alt="Github"
                    className="h-8"
                />
                <div className="mt-1 font-light text-sm text-gray-700">view on github</div>
            </div>
        </div>
    );
};

export default Architecture;
