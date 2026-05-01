FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["EMPSystem.csproj", "./"]
RUN dotnet restore "EMPSystem.csproj"
COPY . .
RUN dotnet build "EMPSystem.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EMPSystem.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EMPSystem.dll"]