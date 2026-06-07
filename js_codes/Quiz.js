  // ============================================================
  // js_codes/Quiz.js
  // ============================================================
  
  // <!-- ══ QUIZ LOGIC ═══════════════════════════════════════ -->

  (function () {
    const TOTAL = 20;
    let score = 0;
    let answered = 0;

    // ── DOM refs
    const elScore    = document.getElementById('quiz-score');
    const elAnswered = document.getElementById('quiz-answered');
    const elBar      = document.getElementById('quiz-progress-bar');
    const elResult   = document.getElementById('quiz-result');

    function updateHUD() {
      elScore.textContent    = score;
      elAnswered.textContent = answered;
      elBar.style.width      = ((answered / TOTAL) * 100) + '%';
      if (answered === TOTAL) showResult();
    }

    function showResult() {
      const pct = Math.round((score / TOTAL) * 100);
      document.getElementById('result-score').textContent =
        score + ' / ' + TOTAL + ' (' + pct + '%)';

      let emoji, msg, color;
      if (pct >= 90) { emoji='🏆'; msg='Ausgezeichnet! Prüfungsreif!';  color='#16a34a'; }
      else if (pct >= 70) { emoji='👍'; msg='Gut gemacht!';             color='var(--color-primary)'; }
      else if (pct >= 50) { emoji='📚'; msg='Nochmal üben empfohlen!';  color='#d97706'; }
      else               { emoji='💪'; msg='Weitermachen – du schaffst das!'; color='#dc2626'; }

      document.getElementById('result-emoji').textContent = emoji;
      const msgEl = document.getElementById('result-msg');
      msgEl.textContent = msg;
      msgEl.style.color = color;

      const bar = document.getElementById('result-bar');
      bar.style.background = color;
      elResult.style.display = 'block';
      // animate bar after display
      requestAnimationFrame(() => requestAnimationFrame(() => {
        bar.style.width = pct + '%';
      }));
      elResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ── Option click handler
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', function () {
        const q = this.closest('.quiz-question');
        if (q.dataset.answered) return;
        q.dataset.answered = '1';
        answered++;

        const correct = this.dataset.correct === 'true';

        // Disable all, reveal correct
        q.querySelectorAll('.quiz-option').forEach(opt => {
          opt.disabled = true;
          if (opt.dataset.correct === 'true') opt.classList.add('quiz-reveal-correct');
        });

        if (correct) {
          this.classList.remove('quiz-reveal-correct');
          this.classList.add('quiz-sel-correct');
          score++;
          const fb = q.querySelector('.quiz-feedback.is-correct');
          if (fb) fb.style.display = 'block';
        } else {
          this.classList.add('quiz-sel-wrong');
          const fb = q.querySelector('.quiz-feedback.is-wrong');
          if (fb) fb.style.display = 'block';
        }
        updateHUD();
      });
    });

    // ── Reset (score bar button)
    function doReset() {
      score = 0; answered = 0;
      document.querySelectorAll('.quiz-question').forEach(q => {
        delete q.dataset.answered;
        q.querySelectorAll('.quiz-option').forEach(opt => {
          opt.disabled = false;
          opt.classList.remove(
            'quiz-sel-correct','quiz-sel-wrong','quiz-reveal-correct'
          );
        });
        q.querySelectorAll('.quiz-feedback').forEach(fb => {
          fb.style.display = 'none';
        });
      });
      elResult.style.display = 'none';
      updateHUD();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.getElementById('quiz-reset').addEventListener('click', doReset);
    document.getElementById('btn-retry').addEventListener('click', doReset);

    updateHUD();
  })();
