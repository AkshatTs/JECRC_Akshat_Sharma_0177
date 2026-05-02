FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["EmsMvcDay2.csproj", "./"]
RUN dotnet restore "EmsMvcDay2.csproj"
COPY . .
RUN dotnet build "EmsMvcDay2.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EmsMvcDay2.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EmsMvcDay2.dll"]