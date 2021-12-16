export default function Typography ({ cn, children }) {
  return (
    <span className={`typography ${typeof cn === 'string' ? cn : cn.join(' ')}`}>
      {children}
    </span>
  )
}
