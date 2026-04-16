
interface TitleProps {
    text: string;
}

const Title = ({ text }: TitleProps) => {
  return (
    <h2 style={style}>{text}</h2>
  )
}

const style = {
    color: '#013E37'
}

export default Title