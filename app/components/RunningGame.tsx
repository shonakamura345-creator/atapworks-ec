"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type ThemeType = "modern" | "europe" | "tokyo" | "egypt";

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "block" | "barrier" | "character";
  theme: ThemeType;
}

interface Building {
  x: number;
  height: number;
  width: number;
  theme: ThemeType;
  windows?: number[];
  style?: number; // 建物のバリエーション
}

export default function RunningGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"waiting" | "playing" | "gameover">("waiting");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("modern");

  // 画像の読み込み用
  const playerImageRef = useRef<HTMLImageElement | null>(null);
  const imagesLoadedRef = useRef(false);

  const playerXRef = useRef(100);
  const playerYRef = useRef(0);
  const playerVelocityYRef = useRef(0);
  const playerWidth = 50;
  const playerHeight = 70;
  const groundYRef = useRef(400);
  const isJumpingRef = useRef(false);
  const jumpCountRef = useRef(0); // ジャンプ回数をカウント
  const lastJumpKeyStateRef = useRef(false); // 前回のキー状態を記録
  const obstaclesRef = useRef<Obstacle[]>([]);
  const buildingsRef = useRef<Building[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const gameSpeedRef = useRef(5);
  const scrollOffsetRef = useRef(0);

  const GRAVITY = 0.8;
  const JUMP_POWER = -15;
  const MAX_JUMP_COUNT = 2; // 最大ジャンプ回数

  // 画像パスの設定
  const PLAYER_IMAGE_PATH = "/Photoroom_20260103_082733.PNG"; // Shoの画像（ゲーム用）

  // テーマの変更（スコアに応じて）
  useEffect(() => {
    if (gameState === "playing") {
      const themeIndex = Math.floor(score / 100) % 4;
      const themes: ThemeType[] = ["modern", "europe", "tokyo", "egypt"];
      setCurrentTheme(themes[themeIndex]);
    }
  }, [score, gameState]);

  // 画像の読み込み
  useEffect(() => {
    const loadImages = () => {
      if (PLAYER_IMAGE_PATH) {
        const playerImg = new Image();
        playerImg.src = PLAYER_IMAGE_PATH;
        playerImg.onload = () => {
          playerImageRef.current = playerImg;
          imagesLoadedRef.current = true;
        };
        playerImg.onerror = () => {
          console.warn("プレイヤー画像の読み込みに失敗しました:", PLAYER_IMAGE_PATH);
          imagesLoadedRef.current = true;
        };
      } else {
        imagesLoadedRef.current = true;
      }
    };
    loadImages();
  }, []);

  // ローカルストレージからハイスコアを読み込む
  useEffect(() => {
    const saved = localStorage.getItem("runningGameHighScore");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // ジャンプ処理（キーボードとタッチの両方で使用）
  const handleJump = useCallback(() => {
    // キーが押された瞬間（前回は離されていた）だけジャンプ処理
    // これにより、キーを離して再度押すことで2段ジャンプが可能
    if (!lastJumpKeyStateRef.current) {
      lastJumpKeyStateRef.current = true;
      // 2段ジャンプが可能（最大2回まで）
      if (jumpCountRef.current < MAX_JUMP_COUNT) {
        playerVelocityYRef.current = JUMP_POWER;
        jumpCountRef.current += 1;
        isJumpingRef.current = true;
      }
    }
  }, []);

  const handleJumpEnd = useCallback(() => {
    // キーを離したら、次のジャンプを許可
    lastJumpKeyStateRef.current = false;
  }, []);

  // キーボード入力の処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        handleJump();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        handleJumpEnd();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleJump, handleJumpEnd]);

  // 衝突判定
  const checkCollision = useCallback((playerX: number, playerY: number, obstacle: Obstacle): boolean => {
    return (
      playerX < obstacle.x + obstacle.width &&
      playerX + playerWidth > obstacle.x &&
      playerY < obstacle.y + obstacle.height &&
      playerY + playerHeight > obstacle.y
    );
  }, []);

  // 建物の生成
  const generateBuildings = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (buildingsRef.current.length === 0) {
      for (let i = 0; i < 10; i++) {
        const height = currentTheme === "tokyo" ? 200 + Math.random() * 250 : 150 + Math.random() * 200;
        const width = 60 + Math.random() * 80;
        buildingsRef.current.push({
          x: scrollOffsetRef.current + canvas.width + i * 150,
          height,
          width,
          theme: currentTheme,
          style: Math.floor(Math.random() * 3),
        });
      }
    }
  }, [currentTheme]);

  // テーマに応じた空の色を取得
  const getSkyGradient = (ctx: CanvasRenderingContext2D, theme: ThemeType) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasRef.current?.height || 500);
    switch (theme) {
      case "europe":
        gradient.addColorStop(0, "#B0C4DE");
        gradient.addColorStop(1, "#E6E6FA");
        break;
      case "tokyo":
        gradient.addColorStop(0, "#1a1a2e");
        gradient.addColorStop(1, "#16213e");
        break;
      case "egypt":
        gradient.addColorStop(0, "#FFD700");
        gradient.addColorStop(1, "#FFA500");
        break;
      default: // modern
        gradient.addColorStop(0, "#87CEEB");
        gradient.addColorStop(1, "#E0F6FF");
    }
    return gradient;
  };

  // テーマに応じた地面の色を取得
  const getGroundColor = (theme: ThemeType) => {
    switch (theme) {
      case "europe":
        return { main: "#8B7355", line: "#6B5B4F" };
      case "tokyo":
        return { main: "#4a4a4a", line: "#2a2a2a" };
      case "egypt":
        return { main: "#CD853F", line: "#A0522D" };
      default:
        return { main: "#95a5a6", line: "#7f8c8d" };
    }
  };

  // 建物の描画（ドット絵風）
  const drawBuilding = (ctx: CanvasRenderingContext2D, building: Building, screenX: number, groundY: number) => {
    // ドット絵風の描画設定
    ctx.imageSmoothingEnabled = false;
    
    const { theme, height, width, style } = building;
    // 座標を整数に丸める（ドット絵風）
    const x = Math.floor(screenX);
    const y = Math.floor(groundY - height);
    const w = Math.floor(width);
    const h = Math.floor(height);

    switch (theme) {
      case "europe":
        // ヨーロッパ風：石造り、三角形の屋根（ドット絵風）
        ctx.fillStyle = "#A9A9A9";
        ctx.fillRect(x, y, w, h);
        // 石の質感（ドット絵風）
        ctx.strokeStyle = "#8B8989";
        ctx.lineWidth = 1;
        for (let i = 0; i < h / 20; i++) {
          const lineY = Math.floor(y + i * 20);
          ctx.beginPath();
          ctx.moveTo(x, lineY);
          ctx.lineTo(x + w, lineY);
          ctx.stroke();
        }
        // 三角形の屋根（ドット絵風）
        ctx.fillStyle = "#8B4513";
        const roofTop = Math.floor(y - 30);
        const roofLeft = Math.floor(x - 5);
        const roofRight = Math.floor(x + w + 5);
        ctx.beginPath();
        ctx.moveTo(roofLeft, y);
        ctx.lineTo(Math.floor(x + w / 2), roofTop);
        ctx.lineTo(roofRight, y);
        ctx.closePath();
        ctx.fill();
        // 窓（ドット絵風）
        ctx.fillStyle = "#FFD700";
        const window1X = Math.floor(x + w * 0.2);
        const window1Y = Math.floor(y + h * 0.4);
        const windowW = Math.floor(w * 0.2);
        const windowH = Math.floor(h * 0.3);
        ctx.fillRect(window1X, window1Y, windowW, windowH);
        ctx.fillRect(Math.floor(x + w * 0.6), window1Y, windowW, windowH);
        break;

      case "tokyo":
        // 東京風：高いビル、ネオン（ドット絵風）
        ctx.fillStyle = "#2C2C2C";
        ctx.fillRect(x, y, w, h);
        // 窓（ドット絵風）
        const windowRows = Math.floor(h / 25);
        for (let r = 0; r < windowRows; r++) {
          for (let c = 0; c < 3; c++) {
            ctx.fillStyle = Math.random() > 0.5 ? "#FFD700" : "#FF6B6B";
            const winX = Math.floor(x + 5 + c * (w - 10) / 3);
            const winY = Math.floor(y + 5 + r * 25);
            const winW = Math.floor((w - 15) / 3);
            ctx.fillRect(winX, winY, winW, 15);
          }
        }
        // 看板（ドット絵風）
        if (style === 0) {
          ctx.fillStyle = "#FF1493";
          ctx.fillRect(Math.floor(x + w / 4), Math.floor(y - 20), Math.floor(w / 2), 15);
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 10px monospace";
          ctx.textAlign = "center";
          ctx.fillText("居酒屋", Math.floor(x + w / 2), Math.floor(y - 8));
        }
        break;

      case "egypt":
        // エジプト風：ピラミッドやオベリスク（ドット絵風）
        if (style === 0) {
          // ピラミッド（ドット絵風）
          ctx.fillStyle = "#DAA520";
          const pyramidTop = Math.floor(y);
          const pyramidLeft = x;
          const pyramidRight = x + w;
          const pyramidBottom = Math.floor(y + h);
          ctx.beginPath();
          ctx.moveTo(Math.floor(x + w / 2), pyramidTop);
          ctx.lineTo(pyramidLeft, pyramidBottom);
          ctx.lineTo(pyramidRight, pyramidBottom);
          ctx.closePath();
          ctx.fill();
          // ピラミッドの線（ドット絵風）
          ctx.strokeStyle = "#B8860B";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(Math.floor(x + w / 2), pyramidTop);
          ctx.lineTo(Math.floor(x + w / 3), Math.floor(y + h / 3));
          ctx.moveTo(Math.floor(x + w / 2), pyramidTop);
          ctx.lineTo(Math.floor(x + w * 2 / 3), Math.floor(y + h / 3));
          ctx.stroke();
        } else {
          // オベリスク（ドット絵風）
          ctx.fillStyle = "#DAA520";
          const obeliskX = Math.floor(x + w * 0.3);
          const obeliskW = Math.floor(w * 0.4);
          ctx.fillRect(obeliskX, y, obeliskW, h);
          // 先端（ドット絵風）
          ctx.beginPath();
          ctx.moveTo(obeliskX, y);
          ctx.lineTo(Math.floor(x + w / 2), Math.floor(y - 20));
          ctx.lineTo(Math.floor(x + w * 0.7), y);
          ctx.closePath();
          ctx.fill();
        }
        break;

      default: // modern
        ctx.fillStyle = "#34495e";
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(Math.floor(x + w - 5), y, 5, h);
        // 窓（ドット絵風）
        if (building.windows) {
          building.windows.forEach((lighted, index) => {
            if (lighted) {
              ctx.fillStyle = "#F1C40F";
              const windowSize = 15;
              const windowGap = 5;
              const windowsPerRow = Math.floor(w / (windowSize + windowGap));
              const row = Math.floor(index / windowsPerRow);
              const col = index % windowsPerRow;
              const windowX = Math.floor(x + col * (windowSize + windowGap) + windowGap);
              const windowY = Math.floor(y + row * (windowSize + windowGap) + windowGap);
              if (windowY + windowSize < y + h) {
                ctx.fillRect(windowX, windowY, windowSize, windowSize);
              }
            }
          });
        }
    }
  };

  // 障害物の描画（ドット絵風）
  const drawObstacle = (ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    // ドット絵風の描画設定
    ctx.imageSmoothingEnabled = false;
    
    const { x, y, width, height, type, theme } = obstacle;
    // 座標を整数に丸める（ドット絵風）
    const px = Math.floor(x);
    const py = Math.floor(y);
    const pw = Math.floor(width);
    const ph = Math.floor(height);

    // すべての障害物を同じ見た目（赤い「!」マーク）に統一
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeStyle = "#c0392b";
    ctx.lineWidth = 3;
    ctx.strokeRect(px, py, pw, ph);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px monospace";
    ctx.textAlign = "center";
    ctx.fillText("!", Math.floor(px + pw / 2), Math.floor(py + ph / 2 + 7));
  };

  // ゲームループ
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== "playing") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ドット絵風の描画設定
    ctx.imageSmoothingEnabled = false; // アンチエイリアスを無効化
    ctx.imageSmoothingQuality = "low";

    const groundY = groundYRef.current;

    // プレイヤーの物理演算
    playerVelocityYRef.current += GRAVITY;
    playerYRef.current += playerVelocityYRef.current;

    if (playerYRef.current + playerHeight > groundY) {
      playerYRef.current = groundY - playerHeight;
      playerVelocityYRef.current = 0;
      isJumpingRef.current = false;
      jumpCountRef.current = 0; // 地面に着地したらジャンプ回数をリセット
      lastJumpKeyStateRef.current = false; // キー状態もリセット
    }

    scrollOffsetRef.current += gameSpeedRef.current;

    generateBuildings();

    buildingsRef.current = buildingsRef.current.filter((building) => {
      if (building.x + building.width < scrollOffsetRef.current) {
        return false;
      }
      building.theme = currentTheme;
      return true;
    });

    const lastBuilding = buildingsRef.current[buildingsRef.current.length - 1];
    if (!lastBuilding || lastBuilding.x + lastBuilding.width < scrollOffsetRef.current + canvas.width + 200) {
      const height = currentTheme === "tokyo" ? 200 + Math.random() * 250 : 150 + Math.random() * 200;
      const width = 60 + Math.random() * 80;
      buildingsRef.current.push({
        x: (lastBuilding ? lastBuilding.x + lastBuilding.width : scrollOffsetRef.current + canvas.width) + 50 + Math.random() * 100,
        height,
        width,
        theme: currentTheme,
        style: Math.floor(Math.random() * 3),
      });
    }

    // 障害物の生成
    if (Math.random() < 0.008) {
      const obstacleTypes: ("block" | "barrier")[] = ["block", "barrier"];
      const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
      obstaclesRef.current.push({
        x: scrollOffsetRef.current + canvas.width + 100,
        y: groundY - (type === "block" ? 80 : 50),
        width: type === "block" ? 60 : 40,
        height: type === "block" ? 80 : 50,
        type,
        theme: currentTheme,
      });
    }

    obstaclesRef.current = obstaclesRef.current
      .filter((obstacle) => {
        obstacle.theme = currentTheme;
        const obstacleScreenX = obstacle.x - scrollOffsetRef.current;
        if (checkCollision(playerXRef.current, playerYRef.current, { ...obstacle, x: obstacleScreenX })) {
          setGameState("gameover");
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("runningGameHighScore", score.toString());
          }
          return false;
        }
        if (obstacle.x < scrollOffsetRef.current - 100) {
          setScore((prev) => prev + 10);
          return false;
        }
        return true;
      });

    gameSpeedRef.current = 5 + Math.floor(score / 100) * 0.3;

    // 描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 空
    ctx.fillStyle = getSkyGradient(ctx, currentTheme);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 建物の描画
    buildingsRef.current.forEach((building) => {
      const screenX = building.x - scrollOffsetRef.current;
      if (screenX + building.width > 0 && screenX < canvas.width) {
        drawBuilding(ctx, building, screenX, groundY);
      }
    });

    // 地面（ドット絵風）
    const groundColors = getGroundColor(currentTheme);
    ctx.fillStyle = groundColors.main;
    const groundYInt = Math.floor(groundY);
    ctx.fillRect(0, groundYInt, canvas.width, canvas.height - groundYInt);
    ctx.fillStyle = groundColors.line;
    ctx.fillRect(0, groundYInt, canvas.width, 5);

    // 障害物の描画
    obstaclesRef.current.forEach((obstacle) => {
      const obstacleScreenX = obstacle.x - scrollOffsetRef.current;
      if (obstacleScreenX + obstacle.width > 0 && obstacleScreenX < canvas.width) {
        drawObstacle(ctx, { ...obstacle, x: obstacleScreenX });
      }
    });

    // プレイヤーの描画（ドット絵風）
    const playerScreenX = Math.floor(playerXRef.current);
    const playerScreenY = Math.floor(playerYRef.current);

    if (playerImageRef.current && playerImageRef.current.complete) {
      // 画像もドット絵風に描画
      ctx.drawImage(playerImageRef.current, playerScreenX, playerScreenY, playerWidth, playerHeight);
    } else {
      ctx.fillStyle = "#3498db";
      ctx.fillRect(Math.floor(playerScreenX + 10), Math.floor(playerScreenY + 25), 30, 45);
      ctx.beginPath();
      ctx.arc(Math.floor(playerScreenX + playerWidth / 2), Math.floor(playerScreenY + 20), 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2c3e50";
      ctx.fillRect(Math.floor(playerScreenX + playerWidth / 2 - 6), Math.floor(playerScreenY + 28), 12, 10);
      ctx.fillStyle = "#2980b9";
      ctx.fillRect(Math.floor(playerScreenX + 12), Math.floor(playerScreenY + 65), 12, 5);
      ctx.fillRect(Math.floor(playerScreenX + 26), Math.floor(playerScreenY + 65), 12, 5);
    }

    // スコア表示（ドット絵風）
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.font = "bold 24px monospace";
    ctx.textAlign = "left";
    ctx.strokeText(`スコア: ${score}`, 20, 40);
    ctx.fillText(`スコア: ${score}`, 20, 40);

    // テーマ表示（ドット絵風）
    const themeNames = { modern: "モダン", europe: "ヨーロッパ", tokyo: "東京", egypt: "エジプト" };
    ctx.font = "bold 16px monospace";
    ctx.strokeText(`場所: ${themeNames[currentTheme]}`, 20, 70);
    ctx.fillText(`場所: ${themeNames[currentTheme]}`, 20, 70);

    if (highScore > 0) {
      ctx.font = "bold 16px monospace";
      ctx.strokeText(`ハイスコア: ${highScore}`, 20, 95);
      ctx.fillText(`ハイスコア: ${highScore}`, 20, 95);
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, score, highScore, currentTheme, checkCollision, generateBuildings]);

  useEffect(() => {
    if (gameState === "playing") {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, gameLoop]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setCurrentTheme("modern");
    playerXRef.current = 100;
    playerYRef.current = groundYRef.current - playerHeight;
    playerVelocityYRef.current = 0;
    isJumpingRef.current = false;
    jumpCountRef.current = 0;
    lastJumpKeyStateRef.current = false;
    obstaclesRef.current = [];
    buildingsRef.current = [];
    scrollOffsetRef.current = 0;
    gameSpeedRef.current = 5;
    generateBuildings();
  };

  const resetGame = () => {
    setGameState("waiting");
    setScore(0);
    setCurrentTheme("modern");
    playerXRef.current = 100;
    playerYRef.current = groundYRef.current - playerHeight;
    playerVelocityYRef.current = 0;
    isJumpingRef.current = false;
    jumpCountRef.current = 0;
    lastJumpKeyStateRef.current = false;
    obstaclesRef.current = [];
    buildingsRef.current = [];
    scrollOffsetRef.current = 0;
    gameSpeedRef.current = 5;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-slate-100 rounded-xl md:rounded-2xl p-0 md:p-8">
        <h3 className="text-xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-4 text-center px-2 pt-2 md:px-0 md:pt-0">
          Sho建築士 街を走るゲーム
        </h3>
        <p className="text-slate-600 text-center mb-0 md:mb-6 text-xs md:text-base hidden md:block">
          PC：スペースキー（または↑キー/Wキー）でジャンプ<br className="hidden md:inline" />
          スマホ：画面をタップしてジャンプ<br className="hidden md:inline" />
          障害物を避けてできるだけ長く走ろう！世界中の街を走り抜けろ！
        </p>

        <div className="relative bg-white rounded-none md:rounded-xl overflow-hidden shadow-lg">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full h-auto max-w-full"
            style={{ display: "block", imageRendering: "pixelated", touchAction: "none" } as React.CSSProperties}
            onTouchStart={(e) => {
              e.preventDefault();
              handleJump();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleJumpEnd();
            }}
          />

          {gameState === "gameover" && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center flex-col">
              <div className="bg-white rounded-2xl p-4 md:p-8 text-center max-w-md mx-2 md:mx-4 w-full max-w-[90%]">
                <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">ゲームオーバー！</h4>
                <p className="text-lg md:text-xl text-slate-700 mb-2">スコア: {score}</p>
                {score === highScore && score > 0 && (
                  <p className="text-blue-600 font-semibold mb-3 md:mb-4 text-sm md:text-base">🎉 ハイスコア更新！</p>
                )}
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
                  <button
                    onClick={startGame}
                    className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors text-base"
                  >
                    もう一度
                  </button>
                  <button
                    onClick={resetGame}
                    className="w-full md:w-auto px-6 py-3 bg-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-400 active:bg-slate-500 transition-colors text-base"
                  >
                    戻る
                  </button>
                </div>
              </div>
            </div>
          )}

          {gameState === "waiting" && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-4 md:p-8 text-center max-w-md mx-2 md:mx-4 w-full max-w-[90%]">
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-4">ゲームスタート</h4>
                <p className="text-slate-600 mb-4 md:mb-6 text-sm md:text-base hidden md:block">
                  スペースキー（または↑キー/Wキー）でジャンプ
                  <br />
                  スマホ：画面をタップしてジャンプ
                  <br />
                  スコア100ごとに世界の街が変わる！
                  <br />
                  障害物を避けてできるだけ長く走ろう！
                </p>
                <p className="text-slate-600 mb-4 md:mb-6 text-xs md:hidden">
                  画面をタップしてジャンプ！
                </p>
                {highScore > 0 && <p className="text-slate-700 mb-3 md:mb-4 text-sm md:text-base">ハイスコア: {highScore}</p>}
                <button
                  onClick={startGame}
                  className="w-full md:w-auto px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors text-base md:text-lg"
                >
                  スタート
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
