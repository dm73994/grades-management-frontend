interface SecondaryTextProps {
    text: string;
    styles?: React.CSSProperties;
}

const SecondaryText = ({ text, styles }: SecondaryTextProps) => {
  return (
    <p style={{ ...style, ...styles }}>
      {text}
    </p>
  )
}

const style = {
    color: 'rgba(1, 62, 55, 0.5)',
    fontSize: '0.9rem',
}

export default SecondaryText