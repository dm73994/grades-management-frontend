
interface HighlightTextProps {
    text: string;
    styles?: React.CSSProperties;
}

const HighlightText = ({ text, styles }: HighlightTextProps) => {
  return (
    <p style={{ ...style, ...styles }}>
      {text}
    </p>
  )
}

const style = {
    color: '#013E37',
    fontWeight: 'bold',
    fontSize: '1.2rem',
}

export default HighlightText