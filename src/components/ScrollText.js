const ScrollText = ({ word }) => {
  return (
    <div class="Marquee__Wrapper">
      <div class="Marquee__TextHolder">
        <div class="Marquee__TextGroup">
          <span class="Marquee__Text">
            <span class="Marquee__Word">{word}.</span>
            <span class="Marquee__Dot"></span>
          </span>
          <span class="Marquee__Text">
            <span class="Marquee__Word">{word}!</span>
            <span class="Marquee__Dot"></span>
          </span>
          <span class="Marquee__Text">
            <span class="Marquee__Word">{word},</span>
            <span class="Marquee__Dot"></span>
          </span>
          <span class="Marquee__Text">
            <span class="Marquee__Word">{word}?</span>
            <span class="Marquee__Dot"></span>
          </span>
          <span class="Marquee__Text">
            <span class="Marquee__Word">"{word}"</span>
            <span class="Marquee__Dot"></span>
          </span>
        </div>
        <div class="Marquee__TextGroup">
          <span class="Marquee__Text">
            <span class="Marquee__Word">{word}.</span>
            <span class="Marquee__Dot"></span>
          </span>
          <span class="Marquee__Text">
            <span class="Marquee__Word">{word}!</span>
            <span class="Marquee__Dot"></span>
          </span>
          <span class="Marquee__Text">
            <span class="Marquee__Word">{word},</span>
            <span class="Marquee__Dot"></span>
          </span>
          <span class="Marquee__Text">
            <span class="Marquee__Word">{word}?</span>
            <span class="Marquee__Dot"></span>
          </span>
          <span class="Marquee__Text">
            <span class="Marquee__Word">"{word}"</span>
            <span class="Marquee__Dot"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollText;
