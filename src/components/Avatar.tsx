import React from "react"

type Props = {
  img: string
  alt?: string
}

const Avatar: React.FC<Props> = ({ img, alt }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-full pt-[100%] ">
      <div className="absolute inset-0">
        <img src={img} alt={alt || img} />
      </div>
    </div>
  )
}

export default Avatar
