/// Service Worker — 오프라인 캐시 전략

const CACHE_NAME = "pwa-starter-v1";
const OFFLINE_URL = "/offline";

// 정적 자산 사전 캐시
const PRECACHE_URLS = ["/", "/offline"];

// 설치: 캐시에 정적 자산 추가
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// 활성화: 이전 캐시 삭제
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: 네트워크 우선, 실패 시 캐시
self.addEventListener("fetch", (event) => {
  // 네비게이션 요청만 처리
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(OFFLINE_URL).then((response) => response)
      )
    );
    return;
  }

  // 기타 요청: 네트워크 우선 + 캐시 폴백
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 성공적인 응답을 캐시에 저장
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// 푸시 알림 수신 (placeholder)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {
    title: "PWA 알림",
    body: "새로운 알림이 있습니다.",
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
    })
  );
});
