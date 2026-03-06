interface Props {
  text?: string;
  streaming?: boolean;
  streamingText?: string;
}

export default function LoadingSpinner({ text, streaming, streamingText }: Props) {
  if (streaming && streamingText !== undefined) {
    return (
      <div className="glass-card p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-kidult-orange font-medium">
          <span className="animate-spin">⟳</span>
          <span>AI Discovery Engine processing...</span>
        </div>
        <div className="text-xs text-kidult-muted font-mono leading-relaxed max-h-40 overflow-hidden">
          {streamingText.slice(-500)}
          <span className="inline-block w-0.5 h-3 bg-kidult-orange ml-0.5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-kidult-border" />
        <div className="absolute inset-0 rounded-full border-2 border-t-kidult-orange animate-spin" />
        <div className="absolute inset-3 rounded-full border-2 border-t-kidult-blue animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }} />
      </div>
      {text && <p className="text-sm text-kidult-muted animate-pulse">{text}</p>}
    </div>
  );
}
