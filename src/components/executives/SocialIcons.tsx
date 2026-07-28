// lucide-react doesn't ship WhatsApp/Snapchat glyphs, so these are simple
// generic line-art stand-ins (not a reproduction of the official marks)
// drawn to match lucide's 24x24 / stroke-based style.

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6.5 20 L7.6 16.3 A7.5 7.5 0 1 1 10.8 18.9 Z" />
      <path d="M9 10.5 C9 11.5 10 13.5 11.5 14.5 C12.7 15.3 13.5 15.3 14 15" strokeWidth={1.5} />
    </svg>
  );
}

export function SnapchatIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 4 C9 4 8 6.2 8 8.5 C8 9.5 8 10.2 7.7 10.7 C7.4 11.1 6.7 11.4 6 11.5 C6.4 12.3 7.3 12.6 8 12.9 C7.8 13.6 7 14.5 5.5 14.9 C6 15.6 7 16 8 16.1 C8.1 16.7 8.3 17.3 9.5 17.3 C10.4 17.3 10.8 18 12 18 C13.2 18 13.6 17.3 14.5 17.3 C15.7 17.3 15.9 16.7 16 16.1 C17 16 18 15.6 18.5 14.9 C17 14.5 16.2 13.6 16 12.9 C16.7 12.6 17.6 12.3 18 11.5 C17.3 11.4 16.6 11.1 16.3 10.7 C16 10.2 16 9.5 16 8.5 C16 6.2 15 4 12 4 Z" />
    </svg>
  );
}
