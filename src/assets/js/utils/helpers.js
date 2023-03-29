export function getBrwoserScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function getCurrentLocation() {
  return [location.protocol, "//", location.host, location.pathname].join("");
}

export function leaveAnimation(node, cb, leaveClass = "animate:leave") {
  const styles = window.getComputedStyle(node);
  if (styles.getPropertyValue("display") === "none") return;

  node.classList.add(leaveClass);

  node.addEventListener(
    "animationend",
    () => {
      cb();
      node.classList.remove(leaveClass);
    },
    { once: true }
  );
}

export function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function formatDate(date) {
  return dayjs(date).format('DD/MM/YYYY')
}

export function timePassed(date) {
  return dayjs(date).fromNow(true) + ' ago';
}

export function timeLeft(from_date, to_date = null) {
  if (to_date == null)   return dayjs().to(dayjs(from_date), true) + ' left'

  return dayjs(from_date).to(dayjs(to_date), true) + ' left'
}

