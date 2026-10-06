export default function AdminCard({ children, className = '', style, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={`rounded-2xl border bg-white ${className}`}
      style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)', ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}
