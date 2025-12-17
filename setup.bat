@echo off
echo ========================================
echo   Razorpay Payment Integration Setup
echo ========================================
echo.

echo [1/4] Checking environment variables...
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please create .env file with your Razorpay keys
    pause
    exit /b 1
)

echo [2/4] Installing frontend dependencies...
call npm install

echo [3/4] Installing backend dependencies...
cd server
call npm install
cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Update your Razorpay keys in .env file
echo 2. Run database migration in Supabase
echo 3. Start the servers with: npm run dev:all
echo.
echo See RAZORPAY_INTEGRATION.md for detailed instructions
echo.
pause
