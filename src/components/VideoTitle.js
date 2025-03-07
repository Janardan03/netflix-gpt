const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-full aspect-video pt-[20%] px-6 md:px-16 absolute text-white bg-gradient-to-r from-black">
      <h1 className="font-bold text-2xl md:text-5xl">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-[35%]">{overview}</p>
      <div className="my-3 md:my-0">
        <button className="bg-white text-black py-1 md:py-3 px-4 md:px-12 text-xl rounded-lg hover:bg-opacity-70">Play</button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-3 px-12 text-xl bg-opacity-50 rounded-lg">More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle